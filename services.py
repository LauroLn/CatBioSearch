def buscar_gene_pkd1(arquivo):
    cabecalho = ''
    sequencias = []
    gene_encontrado = False

    for linha in arquivo:
        linha = linha.decode('utf-8').strip()  # Decodifica e remove espaços em branco
        if linha.startswith('>'):
            if gene_encontrado:
                break
            if 'PKD1' in linha:
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
        raise ValueError("Gene PKD1 não encontrado no arquivo .fasta")
