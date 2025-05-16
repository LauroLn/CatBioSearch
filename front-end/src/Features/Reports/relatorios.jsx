  // HistoricoRelatorios.jsx
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import "./relatorios.css";
  import { FaEllipsisV } from "react-icons/fa";
  import Sidebar from '../../Templates/Sidebar/Sidebar';
  import axios from "../../api";

  const HistoricoRelatorios = () => {
    const navigate = useNavigate();
    const [gatos, setGatos] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [menuOpen, setMenuOpen] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/relatorios/relatorios");
          setGatos(response.data.relatorios || []);
        } catch (err) {
          console.error("Erro ao carregar dados:", err);
          setError("Nenhum dado cadastrado.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Tem certeza que deseja excluir este registro?")) {
        try {
          await axios.delete(`/relatorios/${id}`);
          alert("Registro excluído com sucesso.");
          setGatos((prev) => prev.filter((gato) => gato.id !== id));
        } catch (err) {
          console.error("Erro ao excluir registro:", err);
          alert("Erro ao excluir o registro. Tente novamente.");
        } finally {
          setMenuOpen(null);
        }
      }
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleMenuToggle = (id) => {
      setMenuOpen(menuOpen === id ? null : id);
    };

    const currentItems = gatos.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return (
      <div className="relatorios-page">
        <Sidebar
          expanded={expanded}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        />

        <div className={`main-content ${expanded ? 'sidebar-expanded' : ''}`}>


          <header className="relatorios-header">
            <h1 className="relatorios-title">Histórico de Relatórios</h1>
            <div className="relatorios-actions">
              <button className="relatorios-export-button">Exportar</button>
              <button className="relatorios-add-button" onClick={() => navigate("/passosAnalise/step1")}>
                + Adicionar
              </button>
            </div>
          </header>

          <div className="relatorios-table-container">
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p>{error}</p>
            ) : gatos.length === 0 ? (
              <p className="relatorios-empty-message">Nenhum relatório disponível no momento.</p>
            ) : (
              <>
                <table className="relatorios-table">
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
                          <div className="relatorios-actions-menu-container">
                            <button
                              className="relatorios-actions-button"
                              onClick={() => handleMenuToggle(gato.id)}
                            >
                              <FaEllipsisV />
                            </button>
                            {menuOpen === gato.id && (
                              <div className="relatorios-actions-menu">
                                <button
                                  className="relatorios-edit"
                                  onClick={() => navigate(`/editar/${gato.id}`)}
                                >
                                  Alterar
                                </button>
                                <button
                                  className="relatorios-delete"
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
                <div className="relatorios-pagination">
                  {Array.from({ length: Math.ceil(gatos.length / itemsPerPage) }, (_, index) => (
                    <button
                      key={index}
                      className={`relatorios-pagination-button ${currentPage === index + 1 ? "active" : ""
                        }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default HistoricoRelatorios;
