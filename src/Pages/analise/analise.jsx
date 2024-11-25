// src/pages/AnalysisPage.js
import React from "react";
import "./analise.css"; // Importa o CSS para estilização
import Sidebar from '../../Components/Sidebar';
import RNASequence from './Componentes/RNASequence';
import NeedlemanWunsch from './Componentes/Needlman';
import Proteins from "./Componentes/Protein";
import Dispersao from "./Componentes/Dispersao";

const AnalisePage = () => {
  return (
    <div className="analysis-page">
        <Sidebar />
      {/* Cabeçalho com Resumo */}
      <div className="analysis-summary">
        <div className="summary-item">
          <h3>Classificação de Risco</h3>
          <div className="risk-indicator">Alta</div>
        </div>
        <div className="summary-item">
          <h3>Mutações encontradas</h3>
          <div className="summary-value">3</div>
        </div>
        <div className="summary-item">
          <h3>Similaridade</h3>
          <div className="summary-value">82,96%</div>
        </div>
      </div>

      {/* Seção Needleman Wunsch */}
      <div className="needleman-section">
        <NeedlemanWunsch />
      </div>

      {/* Seção RNA e Dispersão */}
      <div className="analysis-data">
        <div className="transcription-section">
          <RNASequence />
        </div>

        <div className="protein-section">
          <Proteins />
        </div>
      </div>

      {/* Dispersão da Amostra */}
      <div className="scatter-plot">
        <Dispersao />
        
      </div>
    </div>
  );
};

export default AnalisePage;
