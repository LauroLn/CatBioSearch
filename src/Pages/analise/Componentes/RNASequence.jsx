// src/components/RNASequence.js
import React from "react";
import './RNASequences.css'; // Importa o CSS para estilização

const RNASequence = () => {
  return (
    <div className="rna-sequence">
      <h3>Transcrição para RNA</h3>
      {/* Sequência de referência */}
      <div className="sequence-group">
        <p>Seq referência</p>
        <div className="sequence">
          <span className="circle green">A</span>
          <span className="circle yellow">U</span>
          <span className="circle green">G</span>
          <span className="circle pink">-</span>
          <span className="circle green">C</span>
          <span className="circle green">A</span>
          <span className="circle green">U</span>
          <span className="circle yellow">G</span>
          <span className="circle yellow">A</span>
        </div>
        <div className="labels">
          <span className="label">Thr</span>
          <span className="label">His</span>
        </div>
      </div>

      {/* Sequência 2 */}
      <div className="sequence-group">
        <p>Seq 2</p>
        <div className="sequence">
          <span className="circle green">A</span>
          <span className="circle green">C</span>
          <span className="circle green">G</span>
          <span className="circle pink">U</span>
          <span className="circle green">C</span>
          <span className="circle pink">-</span>
          <span className="circle green">U</span>
          <span className="circle green">G</span>
          <span className="circle yellow">A</span>
        </div>
        <div className="labels">
          <span className="label">Thr</span>
          <span className="label">Ser</span>
        </div>
      </div>
    </div>
  );
};

export default RNASequence;
