
import React from "react";
import "./acesso.css";
import Sidebar from '../../Components/Sidebar';
import { FaFilter } from "react-icons/fa";

const AcessoPage = () => {
    return (
        <div className="cats-page">
            {/* Cabeçalho */}
            <Sidebar />
            <header className="user-header">
                <h1 className="user-title">Usuários</h1>
                <div className="user-actions">
                    <button className="filter-button">
                        <FaFilter style={{ marginRight: '10px' }} /> Filtro
                    </button>
                    <button className="export-button">
                        Exportar
                    </button>
                    <button className="add-button">+ Adicionar</button>
                </div>
            </header>

            {/* Tabela */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Função</th>
                        <th>Usuário</th>
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

export default AcessoPage;
