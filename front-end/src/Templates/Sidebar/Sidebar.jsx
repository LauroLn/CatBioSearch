import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logoimage from '../../Components/assets/sem_hover.svg';
import logoHover from '../../Components/assets/logo_com_hover.svg';

const menuItems = [
  { to: '/', icon: <FaHome />, text: 'Início' },
  { to: '/relatorio', icon: <FaChartBar />, text: 'Relatórios' },
  { to: '/cadastro', icon: <FaUser />, text: 'Clientes' },
  { to: '/acesso', icon: <FaCog />, text: 'Acesso' },
];

const Sidebar = ({ expanded, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`sidebar ${expanded ? 'expanded' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="img">
        <img
          src={expanded ? logoHover : logoimage}
          alt="Logo"
        />
      </div>

      <div className="sidebar-content">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.to} className="sidebar-link">
            <div className="sidebar-icon">{item.icon}</div>
            {expanded && <span className="sidebar-text">{item.text}</span>}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <NavLink to="/login" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          {expanded && <span className="sidebar-text">Sair</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
