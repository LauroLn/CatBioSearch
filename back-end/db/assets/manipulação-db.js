const initUserModel = require('../../models/Usuario');

let User;

const initializeModel = async () => {
    User = await initUserModel();
};

// Chama a inicialização do modelo ao carregar o serviço
initializeModel();

const findOne = async (id) => {
    try {
        const user = await User.findByPk(id); 
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    } catch (err) {
        throw new Error(`Erro ao buscar usuário: ${err.message}`);
    }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, updateData) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        await user.update(updateData);
        return { message: 'Usuário atualizado com sucesso', user };
    } catch (error) {
        throw new Error(`Erro ao atualizar o usuário: ${error.message}`);
    }
};

// Função para excluir um usuário por ID
const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        await user.destroy();
        return { message: 'Usuário excluído com sucesso' };
    } catch (error) {
        throw new Error(`Erro ao excluir o usuário: ${error.message}`);
    }
};

// Exporta as funções para serem usadas nas rotas
module.exports = {
    updateUser,
    deleteUser,
    findOne
};
