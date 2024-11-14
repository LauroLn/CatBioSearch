import React from 'react';
import Sidebar from '../../Components/Sidebar';
import './../home/home.css'
import Card from './components/carroussel';
import CreateButton from './components/btn-acessar';
import { Line, Pie } from 'react-chartjs-2';  // Importando o componente Pie
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrando os componentes do Chart.js, incluindo o ArcElement para o gráfico de Pizza
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function HomePage() {
  // Dados para o gráfico de "Casos diagnosticados" (Linha)
  const data1 = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],  // Meses ou qualquer dado de eixo X
    datasets: [
      {
        label: 'Casos Diagnosticados',
        data: [30, 50, 70, 40, 90],  // Dados para o gráfico
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',  // Cor da linha
        tension: 0.1,
      },
    ],
  };

  // Dados para o gráfico de "Casos Positivos" (Pizza)
  const data2 = {
    labels: ['Positivos', 'Negativos', 'Em Análise'],  // Categorias para a pizza
    datasets: [
      {
        label: 'Casos Positivos',
        data: [55, 25, 20],  // Dados da pizza (percentuais)
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],  // Cores da pizza
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],  // Bordas da pizza
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-page">
      <Sidebar />
      <div className="content">
        <div className="header">
          <div className="btn">
            <CreateButton />
          </div>
          <h2>Últimos relatórios</h2>
          <div className="card-sequence">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="charts-container">
          <div className="grafic-diagnoses">
            <div className="chart-1">
              <h3>Casos diagnosticados</h3>
              {/* Gráfico de Casos Diagnosticados (Linha) */}
              <Line data={data1} />
            </div>
          </div>

          <div className="grafic-positive">
            <div className="chart-2">
              <h3>Casos Positivos</h3>
              {/* Gráfico de Casos Positivos (Pizza) */}
              <Pie data={data2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
