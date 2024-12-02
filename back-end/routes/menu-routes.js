const express = require("express");
const router = express.Router();
const initRelatorioModel = require('../models/Relatorio');

let Relatorio;

const initializeRelatorioModel = async () => {
    Relatorio = await initRelatorioModel();
};

const autenticacao = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: "Você precisa estar logado." });
    }
};

router.get("/menu", autenticacao, async (req, res) => {
    console.log("Requisição recebida no endpoint /menu");
    try {
        const relatorios = await Relatorio.findAll({
            attributes: ['id', 'Cliente', 'Nome'],
            order: [['id', 'DESC']],
            limit: 4,
        });
        const totalRelatorios = await Relatorio.count();

        console.log("Relatórios enviados:", relatorios);
        console.log("Total de relatórios:", totalRelatorios);

        res.json({
            message: 'Dados do menu carregados com sucesso',
            relatorios,
            totalRelatorios,
        });
    } catch (err) {
        console.error("Erro ao processar /menu:", err);
        res.status(500).send('Erro ao listar relatórios');
    }
});


// Inicializa os modelos ao carregar o roteador
initializeRelatorioModel();

module.exports = router;
