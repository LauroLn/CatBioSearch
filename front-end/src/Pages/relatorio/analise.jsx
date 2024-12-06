// src/pages/AnalysisPage.js
import React, { useEffect, useState } from "react";
import "./analise.css"; // Importa o CSS para estilização
import Sidebar from "../../Components/Sidebar";
import RNASequence from "./Componentes/RNASequence";
import NeedlemanWunsch from "./Componentes/Needlman";
import Proteins from "./Componentes/Protein";
import Dispersao from "./Componentes/Dispersao";
import axios from "../../api"; // Certifique-se que axios está configurado corretamente

const Relatorio = () => {
  const [relatorio, setRelatorio] = useState(null); // Estado para armazenar o relatório
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(""); // Estado de erro

  // Função para buscar o último relatório da API
  useEffect(() => {
    const fetchUltimoRelatorio = async () => {
      try {
        setLoading(true); // Ativa o carregamento antes de buscar os dados
        const response = await axios.get("relatorios/ultimo"); // Rota para buscar o último relatório
        console.log("Último relatório recebido do backend:", response.data);
        setRelatorio(response.data); // Atualiza o estado com os dados do relatório
      } catch (err) {
        console.error("Erro ao carregar o último relatório:", err);
        setError("Não foi possível carregar o último relatório.");
      } finally {
        setLoading(false); // Sempre desativa o carregamento
      }
    };

    fetchUltimoRelatorio();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="analysis-page">
      <Sidebar />

      {/* Informações do Gato */}
      <div className="cat-info">
        <div className="cat-info-header">
          <h2>Relatório do Animal</h2>
        </div>
        <div className="cat-info-body">
          <p>
            <strong>Nome:</strong> {relatorio?.Nome || "Não informado"}
          </p>
          <p>
            <strong>Idade:</strong> {relatorio?.Idade || "Não informado"}
          </p>
          <p>
            <strong>Sexo:</strong> {relatorio?.Sexo || "Não informado"}
          </p>
          <p>
            <strong>Raça:</strong> {relatorio?.Raca || "Não informado"}
          </p>
          <p>
            <strong>ID do Relatório:</strong> {relatorio?.id || "Não informado"}
          </p>
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
        <p>
          A pontuação obtida no sequenciamento genético foi de:{" "}
          <strong>465.5</strong>.
        </p>
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
