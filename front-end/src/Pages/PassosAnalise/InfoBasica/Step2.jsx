import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Step2 = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    height: "100vh",
    padding: "1rem",
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
    backgroundColor: "#feca57",
    color: "white",
  };

  const labelStyle = {
    fontWeight: "600", // Define o texto como "light"
    fontSize: "14px",
    color: "#333", // Cor opcional para melhor contraste
  };

  return (
    <div style={containerStyle}>
      <h2>Informações da clinica veterinária</h2>
      <div>
          <label style={labelStyle}>Nome</label>
          <input className="inputs" type="text" placeholder="Digite o nome" />

          <label style={labelStyle}>Raça</label>
          <input className="inputs" type="text" placeholder="Digite a raça" />

          <label style={labelStyle}>Idade</label>
          <input className="inputs" type="number" placeholder="Digite a idade" />
        </div>
      <div style={buttonContainerStyle}>
        <button
          style={backButtonStyle}
          onClick={() => navigate("/passosAnalise/step1")}
        >
          ← Voltar
        </button>
        <button
          style={nextButtonStyle}
          onClick={() => navigate("/passosAnalise/step3")}
        >
          Seguinte →
        </button>
      </div>
    </div>
  );
};

export default Step2;
