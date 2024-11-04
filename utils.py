def validar_formato_fasta(cabecalho: str) -> bool:
    """
    Verifica se uma linha é um cabeçalho válido de um arquivo .fasta.
    Um cabeçalho válido começa com o símbolo '>'.
    """
    return cabecalho.startswith('>')
