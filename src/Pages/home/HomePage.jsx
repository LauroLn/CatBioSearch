import React from 'react';
import Sidebar from '../../Components/Sidebar';
import './../home/home.css'
import Card from './components/carroussel';
import CreateButton from './components/btn-acessar';
import { Line, Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function HomePage() {

  const data1 = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], 
    datasets: [
      {
        label: 'Casos Diagnosticados',
        data: [30, 50, 70, 40, 90],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)', 
        tension: 0.1,
      },
    ],
  };

  const data2 = {
    labels: ['Positivos', 'Negativos', 'Em Análise'],  
    datasets: [
      {
        label: 'Casos Positivos',
        data: [55, 25, 20], 
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'], 
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],  
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
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="charts-container">
          <div className="grafic-diagnoses">
            <div className="chart-1">
              <h3>Casos diagnosticados</h3>
             
              <Line data={data1} />
            </div>
          </div>

          <div className="grafic-positive">
            <div className="chart-2">
              <h3>Casos Positivos</h3>
              
              <Pie data={data2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
