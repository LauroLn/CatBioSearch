from Bio.Blast import NCBIWWW, NCBIXML
import requests
from io import StringIO
import time

def buscar_gene_pkd1(conteudo):
    cabecalho = ''
    sequencias = []
    gene_encontrado = False

    for linha in conteudo:
        linha = linha.strip()
        if linha.startswith('>'):
            if gene_encontrado:
                break
            if 'PKD1' in linha.upper():
                cabecalho = linha
                gene_encontrado = True
        elif gene_encontrado:
            sequencias.append(linha)

    if gene_encontrado:
        return {
            'cabecalho': cabecalho,
            'sequencia': ''.join(sequencias)
        }
    else:
        return {"error": "Gene PKD1 não encontrado no arquivo"}

def realizar_blast(sequencia):
    try:
        blast_url = "https://blast.ncbi.nlm.nih.gov/Blast.cgi"
        
        params = {
            "CMD": "Put",
            "PROGRAM": "blastn",
            "DATABASE": "nt",
            "QUERY": sequencia,
            "FORMAT_TYPE": "XML",
            "EXPECT": 0.001,
            "HITLIST_SIZE": 5
        }

        for attempt in range(3):
            print(f"Tentativa {attempt + 1}: Enviando sequência para BLAST")
            response = requests.post(blast_url, data=params, timeout=300)
            
            if response.status_code != 200:
                print(f"Erro HTTP: {response.status_code}")
                continue

            rid = None
            for line in response.text.splitlines():
                if line.startswith("RID"):
                    rid = line.split("=")[-1].strip()
                    break
            
            if rid:
                print(f"RID obtido com sucesso: {rid}")
                break
            else:
                print("Falha ao obter RID. Tentando novamente...")

            time.sleep(5)
        else:
            return {"error": "Falha ao obter RID após várias tentativas"}

        params_check = {
            "CMD": "Get",
            "FORMAT_OBJECT": "SearchInfo",
            "RID": rid
        }

        for _ in range(30):
            result = requests.get(blast_url, params=params_check)
            result.raise_for_status()

            if "Status=READY" in result.text:
                print("Resultados prontos para serem obtidos")
                break
            elif "Status=FAILED" in result.text:
                return {"error": "Falha no processamento do BLAST."}
            
            print("Aguardando resultado...")
            time.sleep(10)

        params_result = {
            "CMD": "Get",
            "RID": rid,
            "FORMAT_TYPE": "XML"
        }
        blast_result = requests.get(blast_url, params=params_result, timeout=300)
        blast_result.raise_for_status()

        blast_record = NCBIXML.read(StringIO(blast_result.text))
        if blast_record.alignments:
            best_hit = blast_record.alignments[0]
            return {
                "title": best_hit.title,
                "length": best_hit.length,
                "score": best_hit.hsps[0].score,
                "e_value": best_hit.hsps[0].expect,
                "identity": best_hit.hsps[0].identities,
                "alignment_length": best_hit.hsps[0].align_length,
                "query_start": best_hit.hsps[0].query_start,
                "subject_start": best_hit.hsps[0].sbjct_start,
                "query_seq": best_hit.hsps[0].query,
                "subject_seq": best_hit.hsps[0].sbjct
            }
        else:
            return {"error": "Nenhum alinhamento encontrado para a sequência fornecida"}
    except requests.Timeout:
        return {"error": "Timeout atingido ao tentar acessar o serviço BLAST NCBI"}
    except Exception as e:
        return {"error": f"Falha no BLAST: {str(e)}"}
