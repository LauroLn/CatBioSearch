from Bio.Blast.Applications import NcbiblastnCommandline
from Bio.Blast import NCBIXML
from io import StringIO
import os

def buscar_gene_pkd1(conteudo):
    """
    Procura pelo gene PKD1 em um arquivo FASTA.
    """
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

def realizar_blast(sequencia, db_path="C:/BLAST/NCBI/blast-2.16.0+/bin/pkd1_db", mutacoes_doenca=None):
    try:
        query_file = "temp_query.fasta"
        result_file = "blast_result.xml"

        with open(query_file, "w") as f:
            f.write(">Consulta\n")
            f.write(sequencia)

        blastn_cline = NcbiblastnCommandline(
            cmd="blastn",
            query=query_file,
            db=db_path,
            evalue=0.001,
            outfmt=5,
            out=result_file
        )
        stdout, stderr = blastn_cline()

        with open(result_file) as result_handle:
            blast_record = NCBIXML.read(result_handle)
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
                    "subject_start": best_hit.hsps[0].sbjct_start
                }
            else:
                return {"error": "Nenhum alinhamento encontrado para a sequência fornecida"}
    except Exception as e:
        return {"error": f"Erro no BLAST local: {str(e)}"}
    finally:
        if os.path.exists(query_file):
            os.remove(query_file)
        if os.path.exists(result_file):
            os.remove(result_file)


