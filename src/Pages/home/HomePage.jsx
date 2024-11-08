// src/Pages/home/HomePage.jsx
import React from 'react';
import Sidebar from '../../Components/Sidebar';

function HomePage() {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="content">
        <h1>Bem-vindo à Home</h1>
        {/* Outros conteúdos da página Home */}
      </div>
    </div>
  );
}

export default HomePage;
