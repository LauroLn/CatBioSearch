import React from 'react';
import Sidebar from "../../Components/Sidebar";
import './home.css';

function Dashboard() {
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
            </div>
            
          </div>
          <div className="header-metrics">
            <div className="metric-card">
              <h3>+15%</h3>
              <p>Crescimento</p>
            </div>
            <div className="metric-card">
              <h3>198</h3>
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
            <ul>
              <li>#23 - Análise Max - VetMais</li>
              <li>#41 - Análise Bella - PetStars</li>
              <li>#54 - Análise Luna - Scooby Pet</li>
              <li>#76 - Análise Rex - Clínica AmoPet</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
