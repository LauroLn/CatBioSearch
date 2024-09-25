// db/connection.js
const { Sequelize } = require('sequelize');

// Configuração da conexão com MySQL
const db = new Sequelize('catSearch', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Especifica que você está usando MySQL
});

module.exports = db;