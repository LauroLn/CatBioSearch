const express = require("express");
const router = express.Router();
const initUserModel = require('../models/Usuario'); // Ajuste o caminho conforme necessário
const { where } = require("sequelize");

let User;

const initializeModel = async () => {
    User = await initUserModel();
};

// Middleware para verificar se o usuário está autenticado
const autenticacao = (req, res, next) => {
    if (req.session.user) {
        return next(); // Se o usuário está autenticado, continua
    } else {
        return res.status(401).json({ "message": "Você precisa estar logado." });
    }
};

// Middleware para verificar se o usuário é admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        return next(); // Se o usuário é admin, continua
    } else {
        return res.status(403).json({ "message": "Acesso negado. Apenas administradores podem acessar." });
    }
};


// Rota de login
router.post('/login', async (req, res) => {
    let { Usuario, Password } = req.body;

    try {
        const usuario = await User.findOne({ where: { Usuario } });

        if (!usuario) {
            return res.status(400).json({ "message": "Usuário não encontrado" });
        }

        if (Password === usuario.Password) {
            // Criar a sessão do usuário
            req.session.user = {
                id: usuario.id,
                nome: usuario.Nome,
                admin: usuario.Admin
            };

            // Redireciona com base no nível de permissão
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
    // Esta rota só pode ser acessada se o usuário estiver logado
    res.json({ message: `Bem-vindo ao painel de usuário, ${req.session.user.nome}` });
});

// Rota protegida para administradores
router.post('/admin-dashboard', autenticacao, isAdmin, async (req, res) => {
    const { Nome, Usuario, Funcao, Password } = req.body;

    try {
        // Cria um novo usuário
        await User.create({
            Nome,
            Usuario,
            Funcao,
            Password,

        });

        // Obtém a lista de todos os usuários cadastrados
        const usuarios = await User.findAll({
            attributes: ['id', 'Nome', 'Usuario', 'Funcao'],
        });

        res.json({
            message: `Bem-vindo ao painel de administrador, ${req.session.user.nome}`,
            usuarios: usuarios
        });
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`);
        res.status(500).send('Ocorreu um erro ao criar o usuário ou listar os usuários.');
    }
});
// Chama a inicialização do modelo quando o roteador é carregado
initializeModel();

module.exports = router;
