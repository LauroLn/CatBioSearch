import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Templates/Sidebar/Sidebar";
import axios from "../api";

const CriarCliente = () => {
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    Nome: "",
    Telefone: "",
    Email: "",
    Endereco: "",
    Observacoes: "",
  });

  // Função para lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/vet/cadastro", formData);
      alert(response.data.message); // Exibe mensagem de sucesso
      navigate("/"); // Redireciona após o cadastro
    } catch (err) {
      console.error("Erro ao cadastrar veterinário:", err);
      alert("Ocorreu um erro ao cadastrar o veterinário.");
    }
  };

  // Estilos
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    minHeight: "100vh",
    padding: "1rem",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "row", // Coloca as colunas lado a lado
    justifyContent: "space-between", // Adiciona espaço entre as colunas
    gap: "2rem", // Define o espaçamento entre as colunas
    width: "100%",
    maxWidth: "800px",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column", // Organiza os itens da coluna verticalmente
    gap: "1rem", // Espaço entre os itens dentro da coluna
    flex: "1", // Faz com que ambas as colunas ocupem tamanhos iguais
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
    width: "100%",
    maxWidth: "500px",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "500px",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const textAreaStyle = {
    ...inputStyle,
    height: "100px",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <h2>Cadastrar Cliente</h2>
      <form style={formStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Nome da Empresa</label>
          <input
            className="inputs"
            type="text"
            name="Nome"
            placeholder="Digite o nome da Empresa"
            value={formData.Nome}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Telefone</label>
          <input
            className="inputs"
            type="text"
            name="Telefone"
            placeholder="Digite o telefone"
            value={formData.Telefone}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>E-mail</label>
          <input
            className="inputs"
            type="email"
            name="Email"
            placeholder="Digite o e-mail"
            value={formData.Email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Endereço</label>
          <input
            className="inputs"
            type="text"
            name="Endereco"
            placeholder="Digite o endereço"
            value={formData.Endereco}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Observação</label>
          <textarea
            style={textAreaStyle}
            className="inputs"
            name="Observacoes"
            placeholder="Digite uma observação"
            value={formData.Observacoes}
            onChange={handleChange}
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
