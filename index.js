const express = require('express')
const path = require('path')
const { Sequelize } = require('sequelize');
const db = require('./db/database')


//instanciando o express na const app
const app = express()

app.use(express.json()); // Para analisar JSON no corpo da requisição

//iniciando as rotas
app.use('/', require('./routes/rotas'))


//pasta estatica
app.use(express.static(path.join(__dirname,'public')))


const startServer = async () => {
    try {
        await db; // Aguarda a conexão com o banco de dados
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};

startServer();
