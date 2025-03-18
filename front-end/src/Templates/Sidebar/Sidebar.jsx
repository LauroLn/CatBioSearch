import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logoimage from '../../Components/assets/sem_hover.svg';

const menuItems = [
  { to: '/', icon: <FaHome />, text: 'Início' },
  { to: '/relatorio', icon: <FaChartBar />, text: 'Relatórios' },
  { to: '/cadastro', icon: <FaUser />, text: 'Clientes' },
  { to: '/acesso', icon: <FaCog />, text: 'Acesso' },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="img">
        <img src={logoimage} alt="Logo" />
      </div>

      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.to} className="sidebar-link">
            <div className="sidebar-icon">{item.icon}</div>
            <span className="sidebar-text">{item.text}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/login" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          <span className="sidebar-text">Sair</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
  