const { Sequelize } = require('sequelize');
const startDb = require('../db/database'); // Importa a função que inicializa a conexão

let Vet; // Variável para armazenar o modelo User

const initVetModel = async () => {
    const db = await startDb(); // Garante que a conexão foi estabelecida

    // Define o modelo User somente após a inicialização do Sequelize
    Vet = db.define('Veterinario', {
        Nome: {
            type: Sequelize.STRING,
            allowNull: false // Campo obrigatório
        },
        Telefone: {
            type: Sequelize.STRING,
            allowNull: false,  // Campo obrigatório
            unique: true
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
            unique: true
        },
        Endereco: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
            unique: true
        },
    Observacoes: {
    type: Sequelize.STRING,
    allowNull: true, // agora pode ser null
    unique: false    // remove unicidade se não precisar
}

    });

    // Sincroniza o modelo com o banco de dados
    await Vet.sync();
    return Vet;
};

module.exports = initVetModel;
