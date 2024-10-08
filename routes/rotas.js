// routes/user.js
const express = require("express");
const router = express.Router();
const initUserModel = require('../models/Usuario'); // Ajuste o caminho conforme necessário
const { where } = require("sequelize");

let User;

const initializeModel = async () => {
    User = await initUserModel();
};



router.post('/cadastro', async (req, res) => {
    let { Nome, Email, Telefone, Password, Admin } = req.body;

    try {
        await User.create({
            Nome,
            Email,
            Telefone,
            Password,
            Admin: Admin || false,
        });
        res.send("Usuario cadastrado com sucesso"); // Redireciona após a criação
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`); // Corrigido
        res.status(500).send('Ocorreu um erro ao criar o usuário.'); // Responde com erro
    }
});

router.post('/login', async (req, res) => {
    let { Email, Password } = req.body;

    try {
        const usuario = await User.findOne({ where: { Email } }); 

        if (!usuario) {
            return res.status(400).json({ "message": "Usuário não encontrado" });
        }

        if (Password === usuario.Password) {
            return res.status(200).json({ "Message": "Login bem sucedido" });
        } else {
            return res.status(400).json({ "Message": "Senha inválida" });
        }
    } catch (err) {
        console.error(`Erro ao fazer login: ${err}`);
        return res.status(500).send('Ocorreu um erro ao fazer login.');
    }
});

// Chama a inicialização do modelo quando o roteador é carregado
initializeModel();

module.exports = router;
