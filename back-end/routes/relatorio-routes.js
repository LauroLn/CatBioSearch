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

// Rota para criar novo relatório
router.post('/novo-relatorio', autenticacao, async (req, res) => {
    const { Nome, Sexo, Cliente, Idade, Raca, Material, Metodo } = req.body;

    try {
        await Relatorio.create({
            Nome,
            Sexo,
            Cliente,
            Idade,
            Raca,
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

router.get('/relatorios',autenticacao, async (req, res) => {
    try {
        // Buscar todos os relatórios na tabela 'Relatorio' 
        const relatorios = await Relatorio.findAll();

        // Verificar se há relatórios
        if (relatorios.length === 0) {
            return res.status(404).json({ message: 'Nenhum relatório encontrado' });
        }

        // Retornar os relatórios como JSON
        res.json({
            message: 'Relatórios encontrados',
            relatorios: relatorios,
        });
    } catch (err) {
        console.error(`Ocorreu um erro ao buscar os relatórios: ${err}`);
        res.status(500).send('Erro ao buscar relatórios');
    }
});

// Rota para buscar relatório por ID
router.get('/relatorio/:id', autenticacao, async (req, res) => {
    const { id } = req.params;

    try {
        const relatorio = await Relatorio.findByPk(id, {
            attributes: ['id', 'Nome', 'Sexo', 'Cliente', 'Idade', 'Material', 'Metodo']
        });

        if (!relatorio) {
            return res.status(404).json({ message: "Relatório não encontrado." });
        }

        res.json(relatorio);
    } catch (err) {
        console.error(`Erro ao buscar relatório: ${err}`);
        res.status(500).send('Ocorreu um erro ao buscar o relatório.');
    }
});

// Rota para atualizar um relatório
router.put('/relatorio/:id', autenticacao, async (req, res) => {
    const { id } = req.params;
    const { Nome, Sexo, Cliente, Idade, Pelagem, Material, Metodo } = req.body;

    try {
        const relatorio = await Relatorio.findByPk(id);

        if (!relatorio) {
            return res.status(404).json({ message: "Relatório não encontrado." });
        }

        await relatorio.update({
            Nome,
            Sexo,
            Cliente,
            Idade,
            Pelagem,
            Material,
            Metodo,
        });

        res.json({ message: "Relatório atualizado com sucesso.", relatorio });
    } catch (err) {
        console.error(`Erro ao atualizar relatório: ${err}`);
        res.status(500).send('Ocorreu um erro ao atualizar o relatório.');
    }
});

// Rota para excluir um relatório
router.delete('/relatorio/:id', autenticacao, async (req, res) => {
    const { id } = req.params;

    try {
        const relatorio = await Relatorio.findByPk(id);

        if (!relatorio) {
            return res.status(404).json({ message: "Relatório não encontrado." });
        }

        await relatorio.destroy();

        res.json({ message: "Relatório excluído com sucesso." });
    } catch (err) {
        console.error(`Erro ao excluir relatório: ${err}`);
        res.status(500).send('Ocorreu um erro ao excluir o relatório.');
    }
});

router.get('/ultimo', autenticacao, async (req, res) => {
    try {
        const relatorio = await Relatorio.findOne({
            order: [['id', 'DESC']], // Ordena pelo ID em ordem decrescente
            attributes: ['id', 'Nome', 'Sexo', 'Cliente', 'Idade', 'Raca', 'Material', 'Metodo']
        });

        if (!relatorio) {
            return res.status(404).json({ message: "Nenhum relatório encontrado." });
        }

        res.json(relatorio);
    } catch (err) {
        console.error(`Erro ao buscar o último relatório: ${err}`);
        res.status(500).send('Ocorreu um erro ao buscar o último relatório.');
    }
});



// Inicializa os modelos ao carregar o roteador
initializeRelatorioModel();

module.exports = router;
