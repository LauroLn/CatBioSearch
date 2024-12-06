// src/pages/AnalysisPage.js
import React from "react";
import "./analise.css"; // Importa o CSS para estilização
import Sidebar from '../../Components/Sidebar';
import RNASequence from './Componentes/RNASequence';
import NeedlemanWunsch from './Componentes/Needlman';
import Proteins from "./Componentes/Protein";
import Dispersao from "./Componentes/Dispersao";

const Relatorio = () => {
  return (
    <div className="analysis-page">
      <Sidebar />

      {/* Informações do Gato */}
      <div className="cat-info">
        <div className="cat-info-header">
          <h2>Relatório do Animal</h2>
        </div>
        <div className="cat-info-body">
          <p><strong>Nome:</strong> Félix</p>
          <p><strong>Idade:</strong> 4 anos</p>
          <p><strong>Sexo:</strong> Masculino</p>
          <p><strong>Raça:</strong> Maine Coon</p>
          <p><strong>ID do Relatório:</strong> 123456</p>
        </div>
      </div>

      {/* Resumo */}
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

      {/* Porcentagem de Doença Renal Policística */}
      <div className="drp-section">
        <h3>Doença Renal Policística</h3>
        <div className="drp-percentage">75%</div>
      </div>

      {/* Identidade dos Genes */}
      <div className="gene-identity">
        <h3>Score</h3>
        <p>A pontuação obtida no sequenciamento genético foi de: <strong>465.5</strong>.</p>
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

export default Relatorio;
