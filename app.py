from flask import Flask, request, jsonify
from flask_cors import CORS
from services import buscar_gene_pkd1, realizar_blast

app = Flask(__name__)
CORS(app)

@app.route('/buscar-pkd1', methods=['POST'])
def buscar_pkd1():
    if 'arquivo' not in request.files:
        return jsonify({"error": "Nenhum arquivo foi enviado"}), 400

    arquivo = request.files['arquivo']
    conteudo = arquivo.stream.read().decode('utf-8').splitlines()

    gene_info = buscar_gene_pkd1(conteudo)
    if 'error' in gene_info:
        return jsonify(gene_info)

    blast_result = realizar_blast(gene_info['sequencia'])
    gene_info['blast_result'] = blast_result

    return jsonify(gene_info)

if __name__ == '__main__':
    app.run(debug=True)
