import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileAlt, FaUser, FaLock } from 'react-icons/fa';
import logoimage from '../Components/assets/logo_branca.svg';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="img" style={{ marginBottom: '0' }}>
          <img src={logoimage} alt="Logo" style={{ width: '100%' }} />
        </div>

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
          <FaLock style={{ marginRight: '10px' }} /> Acesso
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
