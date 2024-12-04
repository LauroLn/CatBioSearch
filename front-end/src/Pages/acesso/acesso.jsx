// src/pages/AcessoPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./acesso.css";
import { FaEllipsisV } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import axios from "../../api";

const AcessoPage = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Quantidade de itens por página
  const [menuOpen, setMenuOpen] = useState(null); // Controla qual menu está aberto

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/users/admin-dashboard");
        setUsuarios(response.data.usuarios);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados.");
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMenuToggle = (id) => {
    setMenuOpen(menuOpen === id ? null : id); // Alterna o menu para abrir/fechar
  };

  const handleEdit = (id) => {
    alert(`Editar usuário com ID: ${id}`);
    setMenuOpen(null); // Fecha o menu após a ação
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      alert(`Excluir usuário com ID: ${id}`);
      // Aqui você pode implementar a lógica de exclusão com a API
    }
    setMenuOpen(null); // Fecha o menu após a ação
  };

  const currentItems = usuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cats-page">
      <Sidebar />
      <header className="cats-header">
        <h1 className="cats-title">Usuários</h1>
        <div className="cats-actions">
          <button className="export-button">Exportar</button>
          <button
            className="add-button"
            onClick={() => navigate("/criarusuario")}
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
              <th>Nome</th>
              <th>Usuário</th>
              <th>Ativo</th>
              <th>Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="inicio">#{usuario.id}</td>
                  <td className="meio">{usuario.Nome}</td>
                  <td className="meio">{usuario.Login}</td>
                  <td className="meio">{usuario.Ativo ? "Sim" : "Não"}</td>
                  <td className="meio">{usuario.Nascimento}</td>
                  <td className="fim">
                    <div className="actions-menu-container">
                      <button
                        className="actions-button"
                        onClick={() => handleMenuToggle(usuario.id)}
                      >
                        <FaEllipsisV />
                      </button>
                      {menuOpen === usuario.id && (
                        <div className="actions-menu">
                          <button
                            className="edit"
                            onClick={() => navigate("/alterarusuario")}
                          >
                            Alterar
                          </button>
                          <button
                            className="delete"
                            onClick={() => handleDelete(usuario.id)}
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
                <td colSpan="6" className="empty-row">Nenhum dado disponível.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(usuarios.length / itemsPerPage) },
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

export default AcessoPage;
