import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../../Components/Sidebar';
import axios from "../../api";

const CriarUsuario = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`/users/admin-usuario/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
          alert("Erro ao carregar usuário.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
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
      const response = id
        ? await axios.put(`/users/admin-usuario/${id}`, formData)
        : await axios.post("/users/admin-cadastro", formData);
      alert(response.data.message);
      navigate("/acesso");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Ocorreu um erro ao salvar o usuário.");
    }
  };

  // Mesmo estilo do AlterarUsuario
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "1rem",
    width: "100%",
    maxWidth: "600px",
  };

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    flex: "1",
    minWidth: "250px",
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
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Carregando...</p>;
  }

  return (
    <div style={containerStyle}>
      <Sidebar />
      <h2>{id ? "Alterar Usuário" : "Cadastrar Novo Usuário"}</h2>
      <form style={formStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Nome Completo</label>
          <input
            style={inputStyle}
            type="text"
            name="Nome"
            placeholder="Digite o nome completo"
            value={formData.Nome}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>CRBM</label>
          <input
            style={inputStyle}
            type="text"
            name="CRBM"
            placeholder="Digite o CRBM"
            value={formData.CRBM}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>Data de Nascimento</label>
          <input
            style={inputStyle}
            type="date"
            name="Nascimento"
            value={formData.Nascimento}
            onChange={handleInputChange}
          />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>CPF</label>
          <input
            style={inputStyle}
            type="text"
            name="CPF"
            placeholder="Digite o CPF"
            value={formData.CPF}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>Nome de Usuário</label>
          <input
            style={inputStyle}
            type="text"
            name="Login"
            placeholder="Digite um nome de usuário"
            value={formData.Login}
            onChange={handleInputChange}
          />

          <label style={labelStyle}>Senha</label>
          <input
            style={inputStyle}
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
