import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios'; // Adicionando axios
import Sidebar from "../../Components/Sidebar";
import './home.css';
import figure from '../../Components/assets/figure-home.svg';
import software from '../../Components/assets/software-uso.svg';
import relatorios from '../../Components/assets/relatorios.svg';
import { RiPencilLine } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import ReportsChart from "./Componentes_Home/grafic.jsx";
import LastAnalyses from './Componentes_Home/analyses.jsx';

function HomePage() {
  const navigate = useNavigate(); // Inicialize o navigate aqui

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

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
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
            </a>
          </div>

          <div className="img-card">
            <img src={figure} alt="" />
          </div>
        </div>

        <div className="header-metrics">
          <div className="metric-card-growth">
            <p>Uso do Software</p>
            <div className="img-crescimento">
              <img src={software} alt="" />
            </div>
          </div>
          <div className="metric-card-report">
            <p>Total de Relatórios</p>
            <div className="img-report">
              <img src={relatorios} alt="" /> 
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          className="iniciar-btn"
          onClick={() => navigate("/passosAnalise/step1")}
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
          <RiPencilLine style={{ marginRight: 5 }} />
          Cadastrar Cliente
        </button>
      </div>

      {/* Charts and Analysis */}
      <div className="charts">
        <div className="chart">
          <ReportsChart/>
        </div>

        <div className="recent-analyses">
          <LastAnalyses/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
