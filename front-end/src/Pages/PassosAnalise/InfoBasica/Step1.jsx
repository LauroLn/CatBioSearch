import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Step1 = () => {
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
    backgroundColor: "#feca57", // Cor para o botão Próximo
    color: "white",
  };

  const labelStyle = {
    fontWeight: "600", // Define o texto como "light"
    fontSize: "14px",
    color: "#333", // Cor opcional para melhor contraste
  };

  return (
    <div style={containerStyle}>
      <h2>Informações Básicas</h2>
      <form style={formStyle}>
        <div>
          <label style={labelStyle}>Nome</label>
          <input className="inputs" type="text" placeholder="Digite o nome" />

          <label style={labelStyle}>Raça</label>
          <input className="inputs" type="text" placeholder="Digite a raça" />

          <label style={labelStyle}>Idade</label>
          <input className="inputs" type="number" placeholder="Digite a idade" />
        </div>
        <div>
          <label style={labelStyle}>Cor da pelagem</label>
          <input className="inputs" type="text" placeholder="Digite a cor da pelagem" />

          <label style={labelStyle}>Sexo</label>
          <select className="inputs">
            <option value="macho">Macho</option>
            <option value="femea">Fêmea</option>
          </select>
        </div>
      </form>
      <div style={buttonContainerStyle}>
        <button style={backButtonStyle} disabled>
          Voltar
        </button>
        <button
          style={nextButtonStyle}
          onClick={() => navigate("/passosAnalise/step2")}
        >
          Seguinte →
        </button>
      </div>
    </div>
  );
};

export default Step1;
