// src/components/CreateButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import './btn-acessar.css';

const CreateButton = () => {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleNavigate = () => {
    navigate('/cadastro'); // Define a rota de destino
  };

  return (
    <button className="create-button" onClick={handleNavigate}>
      + Criar análise
    </button>
  );
};

export default CreateButton;
