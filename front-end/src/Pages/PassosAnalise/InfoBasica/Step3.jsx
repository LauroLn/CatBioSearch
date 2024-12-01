import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Step3 = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const pageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Faz o contêiner ocupar toda a altura da página
    margin: 0,
    backgroundColor: "#f4f4f4", // Cor de fundo opcional
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
    maxWidth: "800px",
    width: "100%",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
  };

  const inputGroupStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "600", // Define o texto como "light"
    fontSize: "14px",
    color: "#333", // Cor opcional para melhor contraste
  };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    backgroundColor: "#F2F2F2",
  };

  const fileUploadStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "2px dashed #ccc",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    background: "#F2F2F2",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    marginTop: "1rem",
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

  const finishButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
    color: "white",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2>Sobre a análise</h2>
        <form style={formStyle}>
          <div style={inputGroupStyle}>
            <div>
              <label style={labelStyle}>Material genético</label>
              <input style={inputStyle} type="text" placeholder="Digite o material genético" />
            </div>
            <div>
              <label style={labelStyle}>Método de sequenciamento</label>
              <input style={inputStyle} type="text" placeholder="Digite o método" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Arquivo para leitura</label>
            <div style={fileUploadStyle}>
              <input
                type="file"
                accept=".fasta,.txt" // Limita a seleção a arquivos FASTA ou TXT
                style={{ display: "none" }}
                id="file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo"}
              </label>
            </div>
          </div>
        </form>
        <div style={buttonContainerStyle}>
          <button
            style={backButtonStyle}
            onClick={() => navigate("/passosAnalise/step2")}
          >
            ← Voltar
          </button>
          <button
            style={finishButtonStyle}
            onClick={() => {
              if (selectedFile) {
                alert(`Arquivo "${selectedFile.name}" enviado com sucesso!`);
              } else {
                alert("Por favor, selecione um arquivo antes de finalizar.");
              }
            }}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
