import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Templates/Sidebar/Sidebar";
import axios from "../api";

const AlterarCliente = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do cliente da URL

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    Nome: "",
    Telefone: "",
    Email: "",
    Endereco: "",
    Observacoes: "",
  });

  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  // Busca os dados do cliente ao carregar a página
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`/vet/${id}`); // Faz o GET pelo ID
        setFormData(response.data); // Preenche os campos do formulário com os dados recebidos
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados do cliente:", err);
        setError("Erro ao carregar os dados do cliente.");
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

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
      await axios.put(`/vet/${id}`, formData); // Atualiza os dados do cliente
      alert("Dados alterados com sucesso!");
      navigate("/cadastro"); // Redireciona após o sucesso
    } catch (err) {
      console.error("Erro ao alterar os dados:", err);
      alert("Ocorreu um erro ao alterar os dados.");
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
    flexWrap: "wrap", // Permite quebrar em telas menores
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
    minWidth: "250px", // Tamanho mínimo para evitar colapso em telas pequenas
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
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const textAreaStyle = {
    ...inputStyle,
    height: "100px",
  };

  // Renderização condicional para carregamento e erros
  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={containerStyle}>
      <Sidebar />
      <h2>Alterar Cliente</h2>
      <form style={formStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Nome da Empresa</label>
          <input
            style={inputStyle}
            type="text"
            name="Nome"
            placeholder="Digite o nome"
            value={formData.Nome}
            onChange={handleChange}
          />

          <label style={labelStyle}>Telefone</label>
          <input
            style={inputStyle}
            type="text"
            name="Telefone"
            placeholder="Digite o telefone"
            value={formData.Telefone}
            onChange={handleChange}
          />

          <label style={labelStyle}>E-mail</label>
          <input
            style={inputStyle}
            type="email"
            name="Email"
            placeholder="Digite o e-mail"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Endereço</label>
          <input
            style={inputStyle}
            type="text"
            name="Endereco"
            placeholder="Digite o endereço"
            value={formData.Endereco}
            onChange={handleChange}
          />

          <label style={labelStyle}>Observações</label>
          <textarea
            style={textAreaStyle}
            name="Observacoes"
            placeholder="Digite uma observação"
            value={formData.Observacoes}
            onChange={handleChange}
          />
        </div>
      </form>
      <div style={buttonContainerStyle}>
        <button style={backButtonStyle} onClick={() => navigate("/cadastro")}>
          Voltar
        </button>
        <button style={nextButtonStyle} onClick={handleSubmit}>
          Salvar Alterações →
        </button>
      </div>
    </div>
  );
};

export default AlterarCliente;
