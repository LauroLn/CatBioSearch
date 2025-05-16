import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Authentication/cadastro.css";
import { FaEllipsisV } from "react-icons/fa";
import Sidebar from '../../Templates/Sidebar/Sidebar';
import axios from "../../api";

const CatsPage = () => {
  const navigate = useNavigate();
  const [clinicas, setClinicas] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Quantidade de itens por página
  const [menuOpen, setMenuOpen] = useState(null); // Controla qual menu está aberto

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchVet = async () => {
      try {
        const response = await axios.get("/vet/veterinarios");
        setClinicas(response.data.veterinarios);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados.");
        setLoading(false);
      }
    };
    fetchVet();
  }, []);

  // Função para deletar um cliente
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await axios.delete(`/vet/${id}`); // Chama a rota DELETE da API
        alert("Cliente excluído com sucesso.");

        // Atualiza a lista de clientes após a exclusão
        setClinicas((prevClinicas) =>
          prevClinicas.filter((clinica) => clinica.id !== id)
        );
      } catch (err) {
        console.error("Erro ao excluir cliente:", err);
        alert("Erro ao excluir o cliente. Tente novamente.");
      }
    }
    setMenuOpen(null); // Fecha o menu após a ação
  };

  // Função para alterar a página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Alterna o menu para abrir/fechar
  const handleMenuToggle = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const currentItems = clinicas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cats-page">
      <Sidebar
        expanded={expanded}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      />

      <div className={`main-content ${expanded ? 'sidebar-expanded' : ''}`}>

        <header className="cats-header">
          <h1 className="cats-title">Clientes Cadastrados</h1>
          <div className="cats-actions">
            <button className="export-button">Exportar</button>
            <button
              className="add-button"
              onClick={() => navigate("/criarcliente")}
            >
              + Adicionar
            </button>
          </div>
        </header>

        <div className="table-container">
          <table className="cats-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Empresa</th>
                <th>Endereço</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((clinica) => (
                  <tr key={clinica.id}>
                    <td className="inicio">#{clinica.id}</td>
                    <td className="meio">{clinica.Nome}</td>
                    <td className="meio">{clinica.Endereco}</td>
                    <td className="meio">{clinica.Email}</td>
                    <td className="meio">{clinica.Telefone}</td>
                    <td className="fim">
                      <div className="actions-menu-container">
                        <button
                          className="actions-button"
                          onClick={() => handleMenuToggle(clinica.id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {menuOpen === clinica.id && (
                          <div className="actions-menu">
                            <button
                              className="edit"
                              onClick={() =>
                                navigate(`/alterarcliente/${clinica.id}`)
                              }
                            >
                              Alterar
                            </button>
                            <button
                              className="delete"
                              onClick={() => handleDelete(clinica.id)}
                            >
                              Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-row">
                    Nenhum dado disponível.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(clinicas.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`pagination-button ${currentPage === index + 1 ? "active" : ""
                  }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CatsPage;
