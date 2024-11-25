// src/components/Charts.js
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import './chart.css'; // Importa o arquivo CSS correto

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

const DiagnosedCasesChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Casos diagnosticados',
                data: [750, 500, 250, 800, 650, 300, 700, 600, 900, 1000],
                borderColor: '#FF6384',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Line data={data} options={options} />
        </div>
    );
};

const PositiveCasesChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Casos Positivos',
                data: [962, 538, 284, 399, 787, 727, 477, 139, 231, 962],
                backgroundColor: '#FFCD56',
                hoverBackgroundColor: '#FF9F40',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Pie data={data} options={options} />
        </div>
    );
};

export { DiagnosedCasesChart, PositiveCasesChart };
