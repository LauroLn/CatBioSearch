import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function StepNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToPreviousStep = () => {
    // Caminhos absolutos para as rotas
    if (location.pathname === '/cadastro/passo2') {
      navigate('/cadastro/passo1');  // Corrigido para caminho absoluto
    } else if (location.pathname === '/cadastro/passo3') {
      navigate('/cadastro/passo2');  // Corrigido para caminho absoluto
    }
  };

  const goToNextStep = () => {
    // Caminhos absolutos para as rotas
    if (location.pathname === '/cadastro/passo1') {
      navigate('/cadastro/passo2');  // Corrigido para caminho absoluto
    } else if (location.pathname === '/cadastro/passo2') {
      navigate('/cadastro/passo3');  // Corrigido para caminho absoluto
    }
  };

  return (
    <div className="step-navigation">
      <button onClick={goToPreviousStep}>Anterior</button>
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  );
}

export default StepNavigation;
