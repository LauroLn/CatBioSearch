const express = require('express');
const path = require('path');
const startDb = require('./db/database');  // Importa a função que inicializa a conexão
const initUserModel = require('./models/Usuario');  // Importa a função que inicializa o modelo User
//const routes = require('./routes/rotas');  // Importa suas rotas
const session = require('express-session');
const menuRoutes = require("./routes/menu-routes");
const userRoutes = require("./routes/user-routes");
const vetRoutes = require('./routes/vet-routes')
const relatorioRoutes = require("./routes/relatorio-routes");
// Instanciando o express na constante app
const app = express();


const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173", // Porta do front-end
    credentials: true,
}));


app.use(session({
    secret: '123123123123', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000, // 1 hora
    }
}));


// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Middleware para as rotas
app.use('/home', menuRoutes);
app.use('/users', userRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/vet', vetRoutes)
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
