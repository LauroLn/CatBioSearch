import React from "react";
import Sidebar from "../../Components/Sidebar";
import { FaFilter, FaChartBar, FaFileAlt, FaUser, FaLock } from 'react-icons/fa';
import './../acesso/acesso.css'

function AcessoPage(){
    return(
        
        <>
            <div className="app-container">
                <Sidebar/>
                <div className="head-info">
                    <h2>Usuário</h2>
                    <div className="action-buttons">
                       <div className="filter">
                       <a href=""><button><FaFilter style={{ marginRight: '10px'}} /> Filtrar</button></a>
                        
                       </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default AcessoPage;