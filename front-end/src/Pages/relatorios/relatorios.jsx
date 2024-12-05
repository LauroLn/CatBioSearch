import React from "react";
import "./relatorios.css";
import Sidebar from "../../Components/Sidebar";

const HistoricoRelatorios = () => {
  const registros = [
    { id: "#236", nome: "Clinica VetMais", raca: "Persa", status: "Concluído", data: "20/04/2024" },
    { id: "#237", nome: "Clinica VetMais", raca: "Persa", status: "Concluído", data: "25/04/2024" },
    { id: "#238", nome: "Clinica VetMais", raca: "Persa", status: "Pendente", data: "01/05/2024" },
    { id: "#239", nome: "Clinica VetMais", raca: "Persa", status: "Concluído", data: "10/05/2024" },
    { id: "#240", nome: "Clinica VetMais", raca: "Persa", status: "Concluído", data: "11/05/2024" },
  ];

  return (

    <>
        <div className="content-relatorio">
        <Sidebar />
        <div className="historico-container">
        {/* Barra de Pesquisa */}
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar Relatório" />
        </div>

        {/* Título e Filtros */}
        <div className="header">
          <h2>Histórico de Relatórios</h2>
          <div className="filter-buttons">
            <button>Hoje</button>
            <button className="active">Semana</button>
            <button>Mês</button>
          </div>
        </div>

        {/* Tabela */}
        <table className="relatorio-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Raça</th>
              <th>Status</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : ""}>
                <td>{registro.id}</td>
                <td>{registro.nome}</td>
                <td>{registro.raca}</td>
                <td>
                  <span className={`status ${registro.status.toLowerCase()}`}>
                    {registro.status}
                  </span>
                </td>
                <td>{registro.data}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="pagination">
          <span>20 Registros</span>
          <div>
            <span>&lt;</span>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>
        </div>
       
    </>
  );
};

export default HistoricoRelatorios;
