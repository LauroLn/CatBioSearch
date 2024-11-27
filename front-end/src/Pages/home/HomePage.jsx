import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Adicionando axios
import Sidebar from "../../Components/Sidebar";
import './home.css';
import figure from '../../Components/assets/figure-home.svg'
import { RiPencilLine } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";


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
      <Sidebar />

      {/* Main Content */}

      {/* Header Section */}
      <div className="header">
        <div className="header-card">
          <div className="content-text">
            <h2 style={{ color: "#FFC100", fontWeight: "700", fontSize: 40 }}>Novidades do Software!</h2>
            <p style={{ color: "#FFFFFF", fontSize: 16 }}>Fique por dentro das inovações da biomedicina.</p>

            <a
              href="#"
              style={{ color: "#FFFFFF", fontWeight: 800, marginTop: "20px", display: "inline-block" }}
            >
              Ver mais
            </a>            </div>

          <div className="img-card">
            <img src={figure} alt="" />
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
        <button
          className="iniciar-btn"
          onClick={() => navigate("/analysis")}
        >
          + Iniciar Análise
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/history")}
        >
          <LuHistory style={{ marginRight: 5 }} />
          Histórico de Análises
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/register")}
        >
          <RiPencilLine style={{ marginRight: 5 }}/>
          Cadastrar Cliente
        </button>
      </div>

      {/* Charts and Analysis */}
      <div className="charts">
        <div className="chart">
          <h3>Relatórios gerados por mês</h3>
          <img src="https://via.placeholder.com/400x200" alt="Gráfico" />
        </div>
        
        <div className="recent-analyses">
          <div className="content-analyses">
          <h3>Últimas Análises</h3>
          <ul>
            <li>#23 - Análise Max - VetMais</li>
            <li>#41 - Análise Bella - PetStars</li>
            <li>#54 - Análise Luna - Scooby Pet</li>
            <li>#76 - Análise Rex - Clínica AmoPet</li>
          </ul>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HomePage;
