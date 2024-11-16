// src/pages/AnalysisPage.js
import React from "react";
import "./analise.css"; // Importa o CSS para estilização
import Sidebar from '../../Components/Sidebar';

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
        <h3>Análise Needleman Wunsch</h3>
        <div className="sequence">
          <p>Seq referência</p>
          <div className="sequence-row">
            <span className="match">A</span>
            <span className="match">T</span>
            <span className="gap">-</span>
            <span className="mismatch">G</span>
            <span className="match">C</span>
          </div>
        </div>
        <div className="sequence">
          <p>Seq 2</p>
          <div className="sequence-row">
            <span className="match">A</span>
            <span className="mismatch">C</span>
            <span className="gap">-</span>
            <span className="match">T</span>
            <span className="match">G</span>
          </div>
        </div>
      </div>

      {/* Seção RNA e Dispersão */}
      <div className="analysis-data">
        <div className="transcription-section">
          <h3>Transcrição para RNA</h3>
          <div className="rna-content">
            <p>Seq referência</p>
            <div className="rna-row">
              <span className="rna">AUG</span>
              <span className="gap">-</span>
              <span className="rna">CAU</span>
            </div>
            <p>Seq 2</p>
            <div className="rna-row">
              <span className="rna">ACG</span>
              <span className="gap">-</span>
              <span className="rna">CUA</span>
            </div>
          </div>
        </div>

        <div className="protein-section">
          <h3>Proteínas</h3>
          <ul>
            <li>Thr - Treonina</li>
            <li>Ser - Serina</li>
            <li>His - Histidina</li>
          </ul>
        </div>
      </div>

      {/* Dispersão da Amostra */}
      <div className="scatter-plot">
        <h3>Dispersão da Amostra</h3>
        <div className="scatter-placeholder">
          {/* Aqui pode ser implementado um gráfico posteriormente */}
          <p>Gráfico de dispersão</p>
        </div>
      </div>
    </div>
  );
};

export default AnalisePage;
