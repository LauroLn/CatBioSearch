import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../Templates/Sidebar/Sidebar';
import axios from "../../api";
import './home.css';
import figure from '../../Components/assets/figure-home.svg';
import software from '../../Components/assets/software-uso.svg';
import relatorios from '../../Components/assets/relatorios.svg';
import { RiPencilLine } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import ReportsChart from "./Componentes_Home/grafic.jsx";

function HomePage() {
  const navigate = useNavigate();

  const [ultimosRelatorios, setUltimosRelatorios] = useState([]);
  const [totalRelatorios, setTotalRelatorios] = useState(null); // Alterado para null
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('/home/menu');
      console.log("Dados recebidos do backend:", response.data); // Inspecione os dados recebidos
      setUltimosRelatorios(response.data.relatorios || []);
      setTotalRelatorios(response.data.totalRelatorios ?? null); // Se não for fornecido, permanece null
      setLoading(false);
      console.log(`${totalRelatorios}`)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="homePage">

      <Sidebar />

      <div className="dashboard">


        <div className="grid-container">
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

                <div className="img-report">
                  <img src={relatorios} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="actions">
          <button
            className="iniciar-btn"
            onClick={() => navigate("/passosAnalise/step1")}
          >
            + Iniciar Análise
          </button>
          <button
            className="home-btn"
            onClick={() => navigate("/relatorio")}
          >
            <LuHistory style={{ marginRight: 5 }} />
            Histórico de Análises
          </button>
          <button
            className="home-btn"
            onClick={() => navigate("/criarcliente")}
          >
            <RiPencilLine style={{ marginRight: 5 }} />
            Cadastrar Cliente
          </button>
        </div>

        <div className="charts">
          <div className="chart">
            <ReportsChart />
          </div>

            <div className="recent-analyses-section">
            
            <h3 className="recent-analyses-title">Últimos Relatórios</h3>
            <div className="recent-analyses">
            {loading ? (
              <p className="recent-analyses-loading">Carregando...</p>
            ) : (
              <ul className="recent-analyses-list">
                {ultimosRelatorios.length > 0 ? (
                  ultimosRelatorios.map((relatorio) => (
                    <li key={relatorio.id} className="recent-analyses-item">
                      <div className="recent-analyses-icon">
                        📄 {/* Você pode substituir por um ícone real, ex.: via biblioteca Font Awesome */}
                      </div>
                      <a className='aa' href='/'>
                        <div className="recent-analyses-content">
                          <p><strong>Clínica:</strong> {relatorio.Cliente}</p>
                          <p><strong>Nome do Gato:</strong> {relatorio.Nome}</p>
                          <p><strong>ID:</strong> {relatorio.id}</p>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="recent-analyses-empty">Nenhum relatório encontrado.</p>
                )}
              </ul>
            )}
          </div>
          </div>



        </div>
      </div>
    </div>


  );
}

export default HomePage;
