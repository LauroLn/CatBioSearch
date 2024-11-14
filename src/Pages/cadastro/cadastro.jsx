import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';  // Ajuste os imports
import Passo1 from './Steps/Passo1';
import Passo2 from './Steps/Passo2';
import Passo3 from './Steps/Passo3';
import StepNavigation from './Component/StepNavigation'; // Certifique-se que o caminho está correto
import Sidebar from '../../Components/Sidebar';

function CadastroPage() {
  const navigate = useNavigate();  // Correção para useNavigate em vez de useHistory
  
  return (
    <div className="cadastro-page">
        <Sidebar />
      <h2>Cadastro de Usuário</h2>
      <Routes>
        <Route path="/cadastro/passo1" element={<Passo1 />} />
        <Route path="/cadastro/passo2" element={<Passo2 />} />
        <Route path="/cadastro/passo3" element={<Passo3 />} />
      </Routes>
      <StepNavigation navigate={navigate} /> {/* Passando o navigate para o StepNavigation */}
    </div>
  );
}

export default CadastroPage;
