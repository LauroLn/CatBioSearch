import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logoimage from '../Components/assets/sem_hover.svg';


const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="img">
        <img src={logoimage} alt="Logo" />
      </div>

      <div className="sidebar-content">

        <NavLink to="/" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          <span className="sidebar-text">Início</span>
        </NavLink>
        <NavLink to="/analise" className="sidebar-link">
          <FaChartBar className="sidebar-icon" />
          <span className="sidebar-text">Relatórios</span>
        </NavLink>
        <NavLink to="/cadastro" className="sidebar-link">
          <FaUser className="sidebar-icon" />
          <span className="sidebar-text">Cadastro</span>
        </NavLink>
        <NavLink to="/acesso" className="sidebar-link">
          <FaCog className="sidebar-icon" />
          <span className="sidebar-text">Acesso</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <NavLink to="/logout" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          <span className="sidebar-text">Sair</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
