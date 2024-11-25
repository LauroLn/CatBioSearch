const { Sequelize } = require('sequelize');
const startDb = require('../db/database'); // Importa a função que inicializa a conexão

let User; // Variável para armazenar o modelo User

const initUserModel = async () => {
    const db = await startDb(); // Garante que a conexão foi estabelecida

    // Define o modelo User
    User = db.define('User', {
        Nome: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
        },
        Login: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
            unique: true, 
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
        },
        CPF: {
            type: Sequelize.STRING, 
            allowNull: false, // Campo obrigatório
        },
        Nascimento: {
            type: Sequelize.STRING, 
            allowNull: false, // Campo obrigatório
        },
        CRBM: {
            type: Sequelize.STRING, 
            allowNull: false, // Campo obrigatório
        },
        Admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false, // O valor padrão é falso, ou seja, não admin
        },
        Ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true, // O valor padrão é true, ou seja, ativo
        },
        Funcao: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Biomédico", // Define o valor padrão como "Biomédico"
        },
    });

    // Sincroniza o modelo com o banco de dados
    await User.sync();
    return User;
};

module.exports = initUserModel;
