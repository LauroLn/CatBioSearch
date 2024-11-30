import React from "react";
import { useParams } from "react-router-dom";

const AnalysisPage = () => {
    const { id } = useParams(); // Obtém o ID da análise pela URL

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Análise #{id}</h2>
            <p>Detalhes da análise aqui...</p>
        </div>
    );
};

export default AnalysisPage;
