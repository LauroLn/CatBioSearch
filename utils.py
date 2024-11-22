from Bio import SeqIO

def ler_arquivo_fasta(arquivo):
    """
    Lê um arquivo FASTA e retorna uma lista de sequências.
    """
    conteudo = arquivo.stream.read().decode('utf-8')
    return conteudo.splitlines()

def salvar_arquivo_temporario(arquivo, nome_temporario):
    """
    Salva o arquivo enviado em um caminho temporário para processamento posterior.
    """
    caminho = f"/tmp/{nome_temporario}"
    with open(caminho, 'wb') as f:
        f.write(arquivo.read())
    return caminho

def extrair_sequencia_do_fasta(filepath):
    """
    Lê um arquivo FASTA de um caminho e extrai a sequência usando BioPython.
    """
    with open(filepath, "r") as handle:
        for record in SeqIO.parse(handle, "fasta"):
            return str(record.seq)
    return None
