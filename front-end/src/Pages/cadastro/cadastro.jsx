import React, { useEffect, useState } from "react";
import "./cadastro.css";
import { FaFilter } from "react-icons/fa";
import Sidebar from '../../Components/Sidebar';
import axios from "../../api";

const CatsPage = () => {

  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cats-page">
      {/* Cabeçalho */}
      <Sidebar />
      <header className="cats-header">
        <h1 className="cats-title">Clientes cadastrados</h1>
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
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
        {clinicas.length > 0 ? (
                        clinicas.map((clinica) => (
                            <tr key={clinica.id}>
                                <td>{clinica.id}</td>
                                <td>{clinica.Nome}</td>
                                <td>{clinica.Telefone}</td>
                                <td>{clinica.Email}</td>
                                <td>{clinica.Endereco}</td>
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

export default CatsPage;
