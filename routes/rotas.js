const express = require("express");
const router = express.Router();
const initUserModel = require('../models/Usuario');
const initRelatorioModel = require('../models/Relatorio');
const initVetModel = require("../models/Veterinario")
const { where } = require("sequelize");
const userService = require('../db/assets/manipulação-db'); // Substitua


let User;
let Relatorio;

const initializeModel = async () => {
    User = await initUserModel();
    Relatorio = await initRelatorioModel();
};

// Middleware para verificar se o usuário está autenticado
const autenticacao = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ "message": "Você precisa estar logado." });
    }
};

// Middleware para verificar se o usuário é admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        return next();
    } else {
        return res.status(403).json({ "message": "Acesso negado. Apenas administradores podem acessar." });
    }
};

// Rota de login
router.post('/', async (req, res) => {
    let { Login, Password } = req.body;

    try {
        const usuario = await User.findOne({ where: { Login } });

        if (!usuario) {
            return res.status(400).json({ "message": "Usuário não encontrado" });
        }

        if (Password === usuario.Password) {
            req.session.user = {
                id: usuario.id,
                nome: usuario.Nome,
                admin: usuario.Admin
            };

            if (usuario.Admin) {
                return res.status(200).json({ "Message": "Admin logado com sucesso", "Redirect": "/admin-dashboard" });
            } else {
                return res.status(200).json({ "Message": "Usuário logado com sucesso", "Redirect": "/user-dashboard" });
            }
        } else {
            return res.status(400).json({ "Message": "Senha inválida" });
        }
    } catch (err) {
        console.error(`Erro ao fazer login: ${err}`);
        return res.status(500).send('Ocorreu um erro ao fazer login.');
    }
});

// Rota protegida para usuários normais
router.get('/user-dashboard', autenticacao, (req, res) => {
    res.json({ message: `Bem-vindo ao painel de usuário, ${req.session.user.nome}` });
});

// Rota protegida para administradores
router.get('/admin-dashboard', autenticacao, isAdmin, async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'Nome', 'Usuario', 'Funcao'],
        });

        res.json({
            message: `Bem-vindo ao painel de administrador, ${req.session.user.nome}`,
            usuarios: usuarios
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao listar os usuarios: ${err}`);
        res.status(500).send('Erro ao listar usuários');
    }
});

// Rota de cadastro de usuário por administradores
router.post('/admin-cadastro', autenticacao, isAdmin, async (req, res) => {
    const { Nome, Login, Password, CPF, Nascimento, CRBM, Admin, Ativo } = req.body;

    try {
        await User.create({
            Nome,
            Login,
            Password,
            CPF,
            Nascimento,
            CRBM,
            Admin,
            Ativo
        });

        res.json({ message: `Usuário cadastrado com sucesso` });
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`);
        res.status(500).send('Ocorreu um erro ao criar o usuário.');
    }
});

// Rota protegida para administradores
router.get('/admin-dashboard', autenticacao, isAdmin, async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['id', 'Nome', 'Login', 'CPF', 'Nascimento', 'CRBM', 'Admin'],
        });

        res.json({
            message: `Bem-vindo ao painel de administrador, ${req.session.user.nome}`,
            usuarios: usuarios,
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao listar os usuarios: ${err}`);
        res.status(500).send('Erro ao listar usuários');
    }
});

// Rota para listar relatórios
router.get("/menu", autenticacao, async (req, res) => {
    try {
        const relatorios = await Relatorio.findAll({
            attributes: ['id', 'Nome', 'Sexo', 'Cliente', 'Idade', 'Pelagem', 'Material', 'Metodo'], // Atualizado
        });
        res.json({
            message: 'Dentro da rota /menu',
            relatorios: relatorios,
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao listar os relatórios: ${err}`);
        res.status(500).send('Erro ao listar relatórios');
    }
});

// Rota para criar novo relatório
router.post('/novo-relatorio', autenticacao, async (req, res) => {
    const { Nome, Sexo, Cliente, Idade, Pelagem, Material, Metodo } = req.body;

    try {
        await Relatorio.create({
            Nome,
            Sexo,
            Cliente,
            Idade,
            Pelagem,
            Material,
            Metodo,
        });
        res.json({ message: 'Relatório criado com sucesso' });
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`);
        res.status(500).send('Ocorreu um erro ao criar o relatório.');
    }
});

// Rota para a outra "tela" de relatório
router.get('/user-dashboard/relatorio', async (req, res) => {
    try {
        const totalRelatorios = await Relatorio.count(); // Conta todos os registros na tabela 'Relatorio'
        res.json({
            message: 'Total de relatórios',
            total: totalRelatorios,
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao contar os relatórios: ${err}`);
        res.status(500).send('Erro ao contar relatórios');
    }
});

    



// Chama a inicialização do modelo quando o roteador é carregado
initializeModel();

module.exports = router;
