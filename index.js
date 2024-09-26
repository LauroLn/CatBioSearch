const express = require('express');
const path = require('path');
const startDb = require('./db/database');  // Importa a função que inicializa a conexão
const initUserModel = require('./models/Usuario');  // Importa a função que inicializa o modelo User
const routes = require('./routes/rotas');  // Importa suas rotas

// Instanciando o express na constante app
const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Middleware para as rotas
app.use('/', routes);

// Pasta estática
app.use(express.static(path.join(__dirname, 'public')));

// Função para conectar ao MySQL e inicializar o modelo
const connectMysqlAndInitModels = async () => {
    try {
        const db = await startDb();  // Garante que a instância do Sequelize está disponível
        await db.authenticate();     // Autentica a conexão
        console.log("MySQL conectado");

        await initUserModel();  // Inicializa e sincroniza o modelo User
        console.log("Modelo User sincronizado com sucesso!");

        return db;
    } catch (err) {
        console.log(`Erro ao conectar ao MySQL ou inicializar o modelo: ${err}`);
        throw err;  // Interrompe o fluxo caso a conexão ou sincronização falhe
    }
};

// Função para iniciar o servidor
const startServer = async () => {
    try {
        await connectMysqlAndInitModels();  // Garante que a conexão ao banco e os modelos foram inicializados
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};

// Inicia o servidor
startServer();
