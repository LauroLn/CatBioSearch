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
    try {
        // Obter os últimos 4 relatórios
        const relatorios = await Relatorio.findAll({
            attributes: ['id', 'Nome', 'Sexo', 'Cliente', 'Idade', 'Pelagem', 'Material', 'Metodo'], // Campos atualizados
            order: [['id', 'DESC']], // Ordenando pela ID de forma decrescente para pegar os mais recentes
            limit: 4, // Limita para os últimos 4
        });

        // Contar o total de relatórios
        const totalRelatorios = await Relatorio.count();

        res.json({
            message: 'Dentro da rota /menu',
            relatorios: relatorios,
            totalRelatorios: totalRelatorios, // Retorna o total de relatórios
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao listar os relatórios: ${err}`);
        res.status(500).send('Erro ao listar relatórios');
    }
});


// Inicializa os modelos ao carregar o roteador
initializeRelatorioModel();

module.exports = router;
