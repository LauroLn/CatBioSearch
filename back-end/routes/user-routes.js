const express = require("express");
const router = express.Router();
const initUserModel = require('../models/Usuario');
const initRelatorioModel = require('../models/Relatorio');

let User;
let Relatorio;

const initializeModels = async () => {
    User = await initUserModel();
    Relatorio = await initRelatorioModel();
};

const autenticacao = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: "Você precisa estar logado." });
    }
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        return next();
    } else {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores podem acessar." });
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
            attributes: ['id', 'Nome', 'Login', 'Ativo', 'Nascimento'],
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

// Rota para buscar usuário por ID
router.get('/admin-usuario/:id', autenticacao, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await User.findByPk(id, {
            attributes: ['id', 'Nome', 'Login', 'CPF', 'Nascimento', 'CRBM', 'Admin', 'Ativo']
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.json(usuario);
    } catch (err) {
        console.error(`Erro ao buscar usuário: ${err}`);
        res.status(500).send('Ocorreu um erro ao buscar o usuário.');
    }
});

// Rota para atualizar informações de um usuário
router.put('/admin-usuario/:id', autenticacao, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { Nome, Login, Password, CPF, Nascimento, CRBM, Admin, Ativo } = req.body;

    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await usuario.update({
            Nome,
            Login,
            Password,
            CPF,
            Nascimento,
            CRBM,
            Admin,
            Ativo
        });

        res.json({ message: "Usuário atualizado com sucesso.", usuario });
    } catch (err) {
        console.error(`Erro ao atualizar usuário: ${err}`);
        res.status(500).send('Ocorreu um erro ao atualizar o usuário.');
    }
});

// Rota para excluir um usuário
router.delete('/admin-usuario/:id', autenticacao, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await usuario.destroy();

        res.json({ message: "Usuário excluído com sucesso." });
    } catch (err) {
        console.error(`Erro ao excluir usuário: ${err}`);
        res.status(500).send('Ocorreu um erro ao excluir o usuário.');
    }
});

// Inicializa os modelos ao carregar o roteador
initializeModels();

module.exports = router;
