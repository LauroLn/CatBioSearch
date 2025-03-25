// src/components/Proteins.js
import React from "react";
import "./Protein.css"; // Importa o CSS para estilização

const Proteins = () => {
  return (
    <div className="proteins-container">
      <h3>Proteínas</h3>
      <ul className="proteins-list">
        <li>Thr - Treonina</li>
        <li>Ser - Serina</li>
        <li>His - Histidina</li>
      </ul>
    </div>
  );
};

export default Proteins;
