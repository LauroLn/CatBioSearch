import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileAlt, FaUser, FaLock } from 'react-icons/fa'; // Adicionando ícones
import logoimage from '../Components/assets/logo_branca.svg';
import './Sidebar.css';
import AcessoPage from '../Pages/acesso/acesso';

const Sidebar = () => {
  return (
    <div style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#292929',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center',
    }}>

      <div className="content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
        {/* Logo e espaçamento */}
        <div className="img" style={{ marginBottom: '20px' }}>
          <img src={logoimage} alt="Logo" style={{ width: '100%' }} />
        </div>

        {/* Links com ícones */}
        <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FaHome style={{ marginRight: '10px' }} /> Home
        </NavLink>
        <NavLink to="/analise" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FaChartBar style={{ marginRight: '10px' }} /> Análise
        </NavLink>
        <NavLink to="/relatorio" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FaFileAlt style={{ marginRight: '10px' }} /> Relatórios
        </NavLink>
        <NavLink to="/cadastro" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FaUser style={{ marginRight: '10px' }} /> Cadastros
        </NavLink>
        <NavLink to="/acesso" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
          <FaLock style={{ marginRight: '10px' }} /> Acessos
        </NavLink>
      </div>

      <div className="conteudo-principal">
          <AcessoPage/>
      </div>
    
    
    </div>
    
  );
};

export default Sidebar;
