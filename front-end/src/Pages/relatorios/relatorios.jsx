import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./relatorios.css";
import { FaEllipsisV } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import axios from "../../api";

const HistoricoRelatorios = () => {
  const navigate = useNavigate();
  const [gatos, setGatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Quantidade de itens por página
  const [menuOpen, setMenuOpen] = useState(null); // Controla qual menu está aberto

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/gatos/dados");
        setGatos(response.data.gatos);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Função para deletar um item
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      try {
        await axios.delete(`/gatos/${id}`);
        alert("Registro excluído com sucesso.");
        setGatos((prevGatos) => prevGatos.filter((gato) => gato.id !== id));
      } catch (err) {
        console.error("Erro ao excluir registro:", err);
        alert("Erro ao excluir o registro. Tente novamente.");
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

  const currentItems = gatos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cats-page">
      <Sidebar />
      <header className="cats-header">
        <h1 className="cats-title">Histórico de Relatórios</h1>
        <div className="cats-actions">
          <button className="export-button">Exportar</button>
          <button className="add-button" onClick={() => navigate("/adicionar")}>
            + Adicionar
          </button>
        </div>
      </header>

      <div className="table-container">
        <table className="cats-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Gato</th>
              <th>Raça</th>
              <th>Nome da Empresa</th>
              <th>Usuário</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((gato) => (
                <tr key={gato.id}>
                  <td className="inicio">#{gato.id}</td>
                  <td className="meio">{gato.nome}</td>
                  <td className="meio">{gato.raca}</td>
                  <td className="meio">{gato.empresa}</td>
                  <td className="meio">{gato.usuario}</td>
                  <td className="meio">{gato.data}</td>
                  <td className="fim">
                    <div className="actions-menu-container">
                      <button
                        className="actions-button"
                        onClick={() => handleMenuToggle(gato.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {menuOpen === gato.id && (
                        <div className="actions-menu">
                          <button
                            className="edit"
                            onClick={() => navigate(`/editar/${gato.id}`)}
                          >
                            Alterar
                          </button>
                          <button
                            className="delete"
                            onClick={() => handleDelete(gato.id)}
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
                <td colSpan="7" className="empty-row">
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
          { length: Math.ceil(gatos.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default HistoricoRelatorios;
