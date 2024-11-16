// src/components/NeedlemanWunsch.js
import React from "react";
import './Needlman.css'; // Importa o CSS para estilização


const NeedlemanWunsch = () => {
  return (
    <div className="needleman-container">
      <h3>Análise Needleman Wunsch</h3>
      
      {/* Sequência de referência */}
      <div className="sequence-group">
        <p>Seq referência</p>
        <div className="sequence-row">
          <span className="box green">A</span>
          <span className="box yellow">T</span>
          <span className="box green">G</span>
          <span className="box pink">-</span>
          <span className="box green">C</span>
          <span className="box green">A</span>
          <span className="box pink">-</span>
          <span className="box green">T</span>
          <span className="box green">G</span>
          <span className="box yellow">C</span>
        </div>
      </div>
      
      {/* Sequência 2 */}
      <div className="sequence-group">
        <p>Seq 2</p>
        <div className="sequence-row">
          <span className="box green">A</span>
          <span className="box yellow">C</span>
          <span className="box green">G</span>
          <span className="box green">T</span>
          <span className="box pink">-</span>
          <span className="box green">T</span>
          <span className="box green">G</span>
          <span className="box yellow">A</span>
        </div>
      </div>

      {/* Legenda */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color green"></span> Match
        </div>
        <div className="legend-item">
          <span className="legend-color pink"></span> Gap
        </div>
        <div className="legend-item">
          <span className="legend-color yellow"></span> Mismatch
        </div>
      </div>
    </div>
  );
};

export default NeedlemanWunsch;
