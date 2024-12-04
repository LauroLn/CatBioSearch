import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from '../../Components/Sidebar';
import { FaFilter } from "react-icons/fa";
import axios from "../../api";

const CriarUsuario = () => {
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
          <h2>Cadastar Cliente</h2>
          <form style={formStyle}>
            <div>
              <label style={labelStyle}>Nome da Empresa</label>
              <input className="inputs" type="text" placeholder="Digite o nome da Empresa" />
    
              <label style={labelStyle}>Telefone</label>
              <input className="inputs" type="text" placeholder="Digite o telefone" />
    
              <label style={labelStyle}>E-mail</label>
              <input className="inputs" type="number" placeholder="Digite o E-mail" />
            </div>
            <div>
              <label style={labelStyle}>Endereço</label>
              <input className="inputs" type="text" placeholder="Digite o Endereço" />
    
              <label style={labelStyle}>Observação</label>
              <input style={inpu} className="inputs" type="textarea" placeholder="Digite uma Observação" />
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

export default CriarUsuario;
