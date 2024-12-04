import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from '../../Components/Sidebar';
import { FaFilter } from "react-icons/fa";
import axios from "../../api";

const CriarCliente = () => {
    const navigate = useNavigate();

    const containerStyle = {
        display: "flex",
        flexDirection: "column", // Define a direção das caixas (coluna ou linha)
        alignItems: "center", // Centraliza os itens horizontalmente
        justifyContent: "center", // Centraliza os itens verticalmente
        gap: "1rem", // Espaçamento entre os itens
        height: "100vh", // Preenche a altura total da tela
        padding: "1rem",
      };
    
      const formStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap", // Permite quebrar linha se necessário
        gap: "1rem",
        width: "100%",
        maxWidth: "600px", // Limita a largura do formulário
      };
    
      const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between", // Espaço igual entre os botões
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
        backgroundColor: "#ff7675", // Cor para o botão Voltar
        color: "white",
      };
    
      const nextButtonStyle = {
        ...buttonStyle,
        backgroundColor: "green", // Cor para o botão Próximo
        color: "white",
      };
    
      const labelStyle = {
        fontWeight: "600", // Define o texto como "light"
        fontSize: "14px",
        color: "#333", // Cor opcional para melhor contraste
      };

      const inpu = {
        height: "100px",
      };
      
    
      return (
        <div style={containerStyle}>
            <Sidebar />
          <h2>Cadastar Usuário</h2>
          <form style={formStyle}>
            <div>
              <label style={labelStyle}>Nome Completo</label>
              <input className="inputs" type="text" placeholder="Digite o nome Completo" />
    
              <label style={labelStyle}>CRBM</label>
              <input className="inputs" type="text" placeholder="Digite o CRBM" />
    
              <label style={labelStyle}>Data de Nascimento</label>
              <input className="inputs" type="number" placeholder="Digite a Data de Nascimento" />
            </div>
            <div>
              <label style={labelStyle}>CPF</label>
              <input className="inputs" type="text" placeholder="Digite o CPF" />
    
              <label style={labelStyle}>Nome de Usuário</label>
              <input className="inputs" type="text" placeholder="Digite um Nome de Usuário" />
    
              <label style={labelStyle}>Senha</label>
              <input className="inputs" type="text" placeholder="Digite a Senha" />
            </div>
          </form>
          <div style={buttonContainerStyle}>
            <button style={backButtonStyle}
            onClick={() => navigate("/")}>
              Voltar
            </button>
            <button
              style={nextButtonStyle}
              onClick={() => navigate("/")}
            >
              Finalizar Cadastro →
            </button>
          </div>
        </div>
    );
};

export default CriarCliente;
