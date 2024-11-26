import React, { useEffect, useState } from "react";
import "./acesso.css";
import Sidebar from '../../Components/Sidebar';
import { FaFilter } from "react-icons/fa";
import axios from "../../api";

const AcessoPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="cats-page">
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

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>Ativo</th>
                        <th>Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.Nome}</td>
                                <td>{usuario.Login}</td>
                                <td>{usuario.Ativo ? "Sim" : "Não"}</td>
                                <td>{usuario.Nascimento}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="empty-row">Nenhum dado disponível.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AcessoPage;
