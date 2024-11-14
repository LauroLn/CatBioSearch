// src/components/CreateButton.js
import React from 'react';
import './btn-acessar.css';

const CreateButton = ({ onClick }) => {
  return (
    <button className="create-button" onClick={onClick}>  
      + Criar análise
    </button>
  );
};

export default CreateButton;
