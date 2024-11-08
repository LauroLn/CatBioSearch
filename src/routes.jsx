// src/routes.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/home/HomePage'; // exemplo de outra página
import Login from './Pages/login/LoginPage';
import RelatorioPage from './Pages/relatorios/relatorios';
import AnalisePage from './Pages/analise/analise';
import CadastroPage from './Pages/cadastro/cadastro';
import AcessoPage from './Pages/acesso/acesso';

const AppRoutes = () => (
  <Router>
    <Routes>
    
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analise" element={<AnalisePage />} />
      <Route path="/relatorio" element={<RelatorioPage />} />
      <Route path="/acesso" element={<AcessoPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
