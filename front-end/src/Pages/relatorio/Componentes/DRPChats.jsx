// src/pages/Componentes/DRPChart.js
import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DRPChart = ({ percentage }) => {
  return (
    <div style={{ width: 150, height: 150, margin: "0 auto" }}>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: percentage > 50 ? "#e74c3c" : "#4caf50",
          trailColor: "#f5f5f5",
        })}
      >
        <div style={{ fontSize: 16, fontWeight: "bold" }}>{percentage}%</div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default DRPChart;
