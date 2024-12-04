import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../Components/Sidebar';
import axios from "../../api";

const CriarCliente = () => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/users/admin-cadastro', formData);
            alert(response.data.message); // Exibe a mensagem de sucesso
            navigate("/"); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Ocorreu um erro ao cadastrar o usuário.");
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

    return (
        <div style={containerStyle}>
            <Sidebar />
            <h2>Cadastar Usuário</h2>
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
                <button style={backButtonStyle} onClick={() => navigate("/")}>
                    Voltar
                </button>
                <button style={nextButtonStyle} onClick={handleSubmit}>
                    Finalizar Cadastro →
                </button>
            </div>
        </div>
    );
};

export default CriarCliente;
