const express = require("express");
const router = express.Router();
const initVetModel = require('../models/Veterinario'); 

let Vet;

// Inicializa o modelo Vet ao carregar o roteador
const initializeVetModel = async () => {
    Vet = await initVetModel();
};

const autenticacao = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: "Você precisa estar logado." });
    }
};

// **Rota para criar novo veterinário**
router.post('/cadastro', autenticacao, async (req, res) => {
    const { Nome, Telefone, Email, Endereco, Observacoes } = req.body;

    try {
        const novoVet = await Vet.create({
            Nome,
            Telefone,
            Email,
            Endereco,
            Observacoes,
        });

        res.status(201).json({ message: 'Veterinário criado com sucesso.', veterinario: novoVet });
    } catch (err) {
        console.error(`Erro ao criar veterinário: ${err}`);
        res.status(500).send('Ocorreu um erro ao criar o veterinário.');
    }
});

// **Rota para buscar todos os veterinários**
router.get('/veterinarios', autenticacao, async (req, res) => {
    try {
        const veterinarios = await Vet.findAll({
            attributes: ['id', 'Nome', 'Telefone', 'Email', 'Endereco', 'Observacoes'],
        });

        res.json({ message: 'Lista de veterinários:', veterinarios });
    } catch (err) {
        console.error(`Erro ao buscar todos os veterinários: ${err}`);
        res.status(500).send('Erro ao buscar veterinários.');
    }
});

// **Rota para buscar um veterinário por ID**
router.get('/:id', autenticacao, async (req, res) => {
    const { id } = req.params;

    try {
        const veterinario = await Vet.findByPk(id, {
            attributes: ['id', 'Nome', 'Telefone', 'Email', 'Endereco', 'Observacoes'],
        });

        if (!veterinario) {
            return res.status(404).json({ message: 'Veterinário não encontrado.' });
        }

        res.json(veterinario);
    } catch (err) {
        console.error(`Erro ao buscar veterinário: ${err}`);
        res.status(500).send('Erro ao buscar veterinário.');
    }
});

// **Rota para atualizar um veterinário**
router.put('/:id', autenticacao, async (req, res) => {
    const { id } = req.params;
    const { Nome, Telefone, Email, Endereco, Observacoes } = req.body;

    try {
        const veterinario = await Vet.findByPk(id);

        if (!veterinario) {
            return res.status(404).json({ message: 'Veterinário não encontrado.' });
        }

        await veterinario.update({
            Nome,
            Telefone,
            Email,
            Endereco,
            Observacoes,
        });

        res.json({ message: 'Veterinário atualizado com sucesso.', veterinario });
    } catch (err) {
        console.error(`Erro ao atualizar veterinário: ${err}`);
        res.status(500).send('Erro ao atualizar veterinário.');
    }
});

// **Rota para excluir um veterinário**
router.delete('/:id', autenticacao, async (req, res) => {
    const { id } = req.params;

    try {
        const veterinario = await Vet.findByPk(id);

        if (!veterinario) {
            return res.status(404).json({ message: 'Veterinário não encontrado.' });
        }

        await veterinario.destroy();

        res.json({ message: 'Veterinário excluído com sucesso.' });
    } catch (err) {
        console.error(`Erro ao excluir veterinário: ${err}`);
        res.status(500).send('Erro ao excluir veterinário.');
    }
});

// Inicializa o modelo ao carregar o roteador
initializeVetModel();

module.exports = router;
