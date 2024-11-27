import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Adicionando axios
import Sidebar from "../../Components/Sidebar";
import './home.css';

function HomePage() {
  // Estado para armazenar os dados
  const [ultimosRelatorios, setUltimosRelatorios] = useState([]);
  const [totalRelatorios, setTotalRelatorios] = useState(0);
  const [loading, setLoading] = useState(true); 


  const fetchData = async () => {
    try {
      const response = await axios.get('/menu'); 
      setUltimosRelatorios(response.data.relatorios); // Últimos 4 relatórios
      setTotalRelatorios(response.data.totalRelatorios); // Total de relatórios
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(`Total de relatórios: ${totalRelatorios}`);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="content">
        {/* Header Section */}
        <div className="header">
          <div className="header-card">
            <div className="content-text">
              <h2>Novidades do Software!</h2>
              <p>Fique por dentro das inovações da biomedicina.</p>

              <a href="#">Ver mais</a>

              <div className="figure"></div>
            </div>
          </div>
          <div className="header-metrics">
            <div className="metric-card">
              <h3>+15%</h3>
              <p>Crescimento</p>
            </div>
            <div className="metric-card">
              <h3>{totalRelatorios}</h3> {/* Exibe o total de relatórios gerados */}
              <p>Relatórios Gerados</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="actions">
          <button className="action-btn">+ Iniciar Análise</button>
          <button className="action-btn">Histórico de Análises</button>
          <button className="action-btn">Cadastrar Cliente</button>
        </div>

        {/* Charts and Analysis */}
        <div className="charts">
          <div className="chart">
            <h3>Relatórios gerados por mês</h3>
            <img src="https://via.placeholder.com/400x200" alt="Gráfico" />
          </div>
          <div className="recent-analyses">
            <h3>Últimas Análises</h3>
            {loading ? (
              <p>Carregando...</p> // Exibe uma mensagem enquanto os dados estão carregando
            ) : (
              <ul>
                {ultimosRelatorios && ultimosRelatorios.length > 0 ? (
                  ultimosRelatorios.map((relatorio) => (
                    <li key={relatorio.id}>#{relatorio.id} - {relatorio.Cliente}</li>
                  ))
                ) : (
                  <li>Sem relatórios disponíveis</li> // Caso não haja relatórios
                )}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
