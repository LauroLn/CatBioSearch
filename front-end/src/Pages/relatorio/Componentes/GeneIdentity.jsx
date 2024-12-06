// src/pages/Componentes/GeneIdentity.js
import React from "react";

const GeneIdentity = ({ similarity }) => {
  return (
    <div className="gene-identity-box">
      <h3>Identidade dos Genes</h3>
      <p>A similaridade entre os genes é de <strong>{similarity}%</strong>.</p>
    </div>
  );
};

export default GeneIdentity;
