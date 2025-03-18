import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./relatorios.css";
import { FaEllipsisV } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "../../api"; // Certifique-se que axios está configurado corretamente

const HistoricoRelatorios = () => {
  const navigate = useNavigate();
  const [gatos, setGatos] = useState([]); // Estado para os dados
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(""); // Estado de erro
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 5; // Itens por página
  const [menuOpen, setMenuOpen] = useState(null); // Estado do menu

  // Função para buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ativa o carregamento antes de buscar os dados
        const response = await axios.get("/relatorios/relatorios");
        console.log("Dados recebidos do backend:", response.data);
        setGatos(response.data.relatorios || []); // Atualiza o estado com os dados da API
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Nenhum dado cadastrado.");
      } finally {
        setLoading(false); // Sempre desativa o carregamento
      }
    };

    fetchData();
  }, []);

  // Função para deletar um item
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      try {
        await axios.delete(`/relatorios/${id}`);
        alert("Registro excluído com sucesso.");
        setGatos((prevGatos) => prevGatos.filter((gato) => gato.id !== id));
      } catch (err) {
        console.error("Erro ao excluir registro:", err);
        alert("Erro ao excluir o registro. Tente novamente.");
      } finally {
        setMenuOpen(null); // Fecha o menu após a ação
      }
    }
  };

  // Função para alterar a página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Alterna o menu de ações
  const handleMenuToggle = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  // Define os itens da página atual
  const currentItems = gatos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Renderização da página
  return (
    <div className="cats-page">
      <Sidebar />
      <header className="cats-header">
        <h1 className="cats-title">Histórico de Relatórios</h1>
        <div className="cats-actions">
          <button className="export-button">Exportar</button>
          <button className="add-button" onClick={() => navigate("/passosAnalise/step1")}>
            + Adicionar
          </button>
        </div>
      </header>

      <div className="table-container">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : gatos.length === 0 ? (
          <p className="empty-message">Nenhum relatório disponível no momento.</p>
        ) : (
          <>
            <table className="cats-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Raça</th>
                  <th>Cliente</th>
                  <th>Idade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((gato) => (
                  <tr key={gato.id}>
                    <td>#{gato.id}</td>
                    <td>{gato.Nome}</td>
                    <td>{gato.Raca}</td>
                    <td>{gato.Cliente}</td>
                    <td>{gato.Idade}</td>
                    <td>
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
                ))}
              </tbody>
            </table>
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
          </>
        )}
      </div>
    </div>
  );
};

export default HistoricoRelatorios;
