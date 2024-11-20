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
        Login: {
            type: Sequelize.STRING,
            allowNull: false,  // Campo obrigatório
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
            type: Sequelize.DATE, 
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
    });

    // Sincroniza o modelo com o banco de dados
    await User.sync();
    return User;
};

module.exports = initUserModel;
