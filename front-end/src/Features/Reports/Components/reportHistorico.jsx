// src/pages/ReportHistory.js
import React from "react";
import "./reportHistorico.css"; // Importa o CSS para estilização
import { FaFilter } from "react-icons/fa";

const ReportHistory = () => {
  const reports = [
    { name: "Thor", probability: "PKD1", color: "green", date: "10/11/2024" },
    { name: "Luna", probability: "PKD1", color: "blue", date: "09/11/2024" },
    { name: "Amora", probability: "PKD1", color: "blue", date: "08/11/2024" },
    { name: "Mingau", probability: "PKD1", color: "blue", date: "07/11/2024" },
    { name: "Bolt", probability: "PKD1", color: "blue", date: "06/11/2024" },
  ];

  return (
    <div className="report-history">
      {/* Cabeçalho */}
      <header className="history-header">
        <h1>Histórico de relatórios</h1>
        <div className="actions">
          <button className="filter-button">
            <FaFilter /> Filtrar
          </button>
        </div>
      </header>

      {/* Lista de Relatórios */}
      <div className="report-list">
        {reports.map((report, index) => (
          <div className="report-item" key={index}>
            <div className="report-circle" style={{ borderColor: report.color }}>
              <div
                className="report-fill"
                style={{ backgroundColor: report.color }}
              ></div>
            </div>
            <div className="report-details">
              <p className="report-name">Nome: {report.name}</p>
              <p className="report-probability">
                Probabilidade: {report.probability}
              </p>
              <hr />
            </div>
            <div className="report-date">
              <p>{report.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportHistory;