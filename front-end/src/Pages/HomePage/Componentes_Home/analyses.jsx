import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LastAnalyses = () => {
    const [analyses, setAnalyses] = useState([]); // Armazena todas as análises
    const [loading, setLoading] = useState(true); // Indica se está carregando
    const navigate = useNavigate(); // Hook para navegação

    // Simula uma API para obter análises
    const fetchAnalyses = async () => {
        setLoading(true);
        // Simulação de dados (troque por uma chamada de API real, se necessário)
        const fakeData = [
            { id: 23, name: "Análise Max", clinic: "VetMais" },
            { id: 41, name: "Análise Bella", clinic: "PetStars" },
            { id: 54, name: "Análise Luna", clinic: "Scooby Pet" },
            { id: 76, name: "Análise Rex", clinic: "Clínica AmorPet" },
        ];
        setTimeout(() => {
            setAnalyses(fakeData); // Define os dados das análises
            setLoading(false);
        }, 1000); // Simula um atraso na resposta
    };

    // Chama a API ao carregar o componente
    useEffect(() => {
        fetchAnalyses();
    }, []);

    // Função para navegar para a página de análise
    const handleNavigate = (id) => {
        navigate(`/analise/${id}`); // Redireciona para a rota específica
    };

    if (loading) {
        return <p>Carregando análises...</p>;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "#6F6F6F" }}>Últimas Análises</h2>
            <p style={{ fontSize: "14px", color: "#6F6F6F" }}>
                {new Date().toLocaleDateString("pt-BR")}
            </p>
            
            <div style={{ marginTop: "20px" }}>
                {analyses.map((analysis) => (
                    <div
                        key={analysis.id}
                        onClick={() => handleNavigate(analysis.id)} // Chama a função ao clicar
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#f4f4f4",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            width: "18rem",
                        }}
                    >
                        <div>
                            <p style={{ margin: 0, fontSize: "14px", color: "#6F6F6F" }}>
                                #{analysis.id}
                            </p>
                            <h3 style={{ margin: "5px 0 0", fontSize: "18px", fontWeight: "bold", color: "#6F6F6F" }}>
                                {analysis.name}
                            </h3>
                        </div>
                        <p style={{ margin: 0, fontSize: "14px", color: "#6F6F6F" }}>
                            {analysis.clinic}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastAnalyses;
