# flask_api/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições CORS para integração com o frontend

# Função para processar o arquivo .fasta e buscar o gene PKD1
def buscar_gene_pkd1(conteudo):
    cabecalho = ''
    sequencias = []
    gene_encontrado = False

    for linha in conteudo:
        linha = linha.strip()
        if linha.startswith('>'):  # Identifica o cabeçalho
            if gene_encontrado:
                break
            if 'PKD1' in linha:  # Verifica se é o gene PKD1
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
        return {"error": "Gene PKD1 não encontrado no arquivo .fasta"}

# Rota para receber o arquivo .fasta
@app.route('/buscar-pkd1', methods=['POST'])
def buscar_pkd1():
    if 'arquivo' not in request.files:
        return jsonify({"error": "Nenhum arquivo foi enviado"}), 400

    arquivo = request.files['arquivo']
    conteudo = arquivo.stream.read().decode('utf-8').splitlines()
    resultado = buscar_gene_pkd1(conteudo)
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)
