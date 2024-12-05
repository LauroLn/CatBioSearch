import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../../Components/Sidebar';
import axios from "../../api";

const CriarUsuario = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nome: "",
        Login: "",
        Password: "",
        CPF: "",
        Nascimento: "",
        CRBM: "",
        Admin: false,
        Ativo: true,
    });

    const [isLoading, setIsLoading] = useState(true);

    // Função para buscar as informações do usuário
    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/users/admin-usuario/${id}`);
                    setFormData(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Erro ao carregar usuário:", error);
                    alert("Erro ao carregar usuário.");
                }
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/users/admin-usuario/${id}`, formData);
            alert(response.data.message); // Exibe a mensagem de sucesso
            navigate("/acesso"); // Redireciona para a página inicial após salvar
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            alert("Ocorreu um erro ao salvar o usuário.");
        }
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "100vh",
        padding: "1rem",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1rem",
        width: "100%",
        maxWidth: "600px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "600px",
    };

    const buttonStyle = {
        padding: "0.75rem 1.5rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    const backButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#ff7675",
        color: "white",
    };

    const nextButtonStyle = {
        ...buttonStyle,
        backgroundColor: "green",
        color: "white",
    };

    const labelStyle = {
        fontWeight: "600",
        fontSize: "14px",
        color: "#333",
    };

    // Se ainda estiver carregando, exibe uma mensagem de carregamento
    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <div style={containerStyle}>
            <Sidebar />
            <h2>{id ? "Alterar Usuário" : "Cadastrar Novo Usuário"}</h2>
            <form style={formStyle}>
                <div>
                    <label style={labelStyle}>Nome Completo</label>
                    <input
                        className="inputs"
                        type="text"
                        name="Nome"
                        placeholder="Digite o nome completo"
                        value={formData.Nome}
                        onChange={handleInputChange}
                    />

                    <label style={labelStyle}>CRBM</label>
                    <input
                        className="inputs"
                        type="text"
                        name="CRBM"
                        placeholder="Digite o CRBM"
                        value={formData.CRBM}
                        onChange={handleInputChange}
                    />

                    <label style={labelStyle}>Data de Nascimento</label>
                    <input
                        className="inputs"
                        type="date"
                        name="Nascimento"
                        value={formData.Nascimento}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label style={labelStyle}>CPF</label>
                    <input
                        className="inputs"
                        type="text"
                        name="CPF"
                        placeholder="Digite o CPF"
                        value={formData.CPF}
                        onChange={handleInputChange}
                    />

                    <label style={labelStyle}>Nome de Usuário</label>
                    <input
                        className="inputs"
                        type="text"
                        name="Login"
                        placeholder="Digite um nome de usuário"
                        value={formData.Login}
                        onChange={handleInputChange}
                    />

                    <label style={labelStyle}>Senha</label>
                    <input
                        className="inputs"
                        type="password"
                        name="Password"
                        placeholder="Digite a senha"
                        value={formData.Password}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <div style={buttonContainerStyle}>
                <button style={backButtonStyle} onClick={() => navigate("/acesso")}>
                    Voltar
                </button>
                <button style={nextButtonStyle} onClick={handleSubmit}>
                    {id ? "Salvar Alterações" : "Finalizar Cadastro →"}
                </button>
            </div>
        </div>
    );
};

export default CriarUsuario;
