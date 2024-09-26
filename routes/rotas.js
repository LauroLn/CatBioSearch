// routes/user.js
const express = require("express");
const router = express.Router();
const initUserModel = require('../models/Usuario'); // Ajuste o caminho conforme necessário

let User;

const initializeModel = async () => {
    User = await initUserModel();
};

router.get("/", (req, res) => {
    res.send("Testando");
});

router.post('/add', async (req, res) => {
    let { Nome, Email, Telefone, Password } = req.body;

    try {
        await User.create({
            Nome,
            Email,
            Telefone,
            Password
        });
        res.redirect('/'); // Redireciona após a criação
    } catch (err) {
        console.error(`Ocorreu um erro: ${err}`); // Corrigido
        res.status(500).send('Ocorreu um erro ao criar o usuário.'); // Responde com erro
    }
});

// Chama a inicialização do modelo quando o roteador é carregado
initializeModel();

module.exports = router;
