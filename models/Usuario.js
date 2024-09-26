const { Sequelize } = require('sequelize');
const startDb = require('../db/database'); // Importa a função que inicializa a conexão

let User; // Variável para armazenar o modelo User

const initUserModel = async () => {
    const db = await startDb(); // Garante que a conexão foi estabelecida

    // Define o modelo User somente após a inicialização do Sequelize
    User = db.define('User', {
        Nome: {
            type: Sequelize.STRING,
            allowNull: false, // Campo obrigatório
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true, // Email único
        },
        Telefone: {
            type: Sequelize.STRING, // Definido como STRING
        },
        Password: {
            type: Sequelize.STRING, // Corrige o nome do campo
            allowNull: false, // Campo obrigatório
        }
    });

    // Sincroniza o modelo com o banco de dados
    await User.sync({ alter: true }); // Cria/atualiza a tabela
    return User;
};

module.exports = initUserModel;
