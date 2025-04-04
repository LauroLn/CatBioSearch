import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportsChart = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  if (inView && !animate) {
    setAnimate(true); // Ativa a animação apenas ao entrar na tela
  }

  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Relatórios gerados por mês",
        data: animate ? [10, 50, 30, 5, 25] : [0, 0, 0, 0, 0], // Crescimento das barras
        backgroundColor: "rgba(255, 193, 7, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e0e0e0",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div
      ref={ref}
      style={{ width: "50rem", margin: "0 auto", padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "12px" }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#6F6F6F"}}>Relatórios gerados por mês</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ReportsChart;
