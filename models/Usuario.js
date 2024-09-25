const Sequelize = require('sequelize');
const db = require('../db/database');

const User = db.define('User', {
    Nome: {
        type: Sequelize.STRING,
        allowNull: false, // Torna o campo obrigatório (opcional)
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
    },
    Telefone: {
        type: Sequelize.STRING, // Alterado para STRING
    },
    Password: {
        type: Sequelize.STRING, // Corrigido de "Passwork" para "Password"
        allowNull: false, // Torna o campo obrigatório (opcional)
    }
});

module.exports = User;
