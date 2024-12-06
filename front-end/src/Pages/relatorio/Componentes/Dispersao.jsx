// src/components/ScatterPlot.js
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dispersao.css"; // Importa o CSS para estilização

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dispersao = () => {
  // Dados do gráfico
  const data = {
    datasets: [
      {
        label: "Seq referência",
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 10 + 5, // Tamanhos variáveis para os pontos
        })),
        backgroundColor: "rgba(75, 192, 192, 1)", // Cor verde
      },
      {
        label: "Seq 2",
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 10 + 5, // Tamanhos variáveis para os pontos
        })),
        backgroundColor: "rgba(192, 75, 192, 1)", // Cor roxa
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Eixo X",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Eixo Y",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="scatter-container">
      <h3>Dispersão da Amostra</h3>
      <div className="scatter-chart">
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default Dispersao;
