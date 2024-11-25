
import React from "react";
import "./cadastro.css";
import { FaFilter } from "react-icons/fa";
import Sidebar from '../../Components/Sidebar';

const CatsPage = () => {
  return (
    <div className="cats-page">
      {/* Cabeçalho */}
      <Sidebar />
      <header className="cats-header">
        <h1 className="cats-title">Gatos cadastrados</h1>
        <div className="cats-actions">
          <button className="filter-button">
            <FaFilter style={{ marginRight: '10px' }} /> Filtro
          </button>
          <button className="add-button">+ Adicionar</button>
        </div>
      </header>

      {/* Tabela */}
      <table className="cats-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Proprietário</th>
            <th>Data última análise</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td colSpan="5" className="empty-row">
              Nenhum dado disponível.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CatsPage;
