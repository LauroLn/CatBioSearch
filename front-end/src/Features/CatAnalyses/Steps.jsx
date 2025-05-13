import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Certifique-se de que o caminho está correto
import "../CatAnalyses/PassosAnalise/style.css";

const Cadastro = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        nomeGato: "",
        racaGato: "",
        idadeGato: "",
        sexoGato: "",
        nomeClinica: "",
        telefoneClinica: "",
        emailClinica: "",
        enderecoClinica: "",
        clienteCadastrado: "Não", // Valor padrão para "Não"
        materialGenetico: "",
        sequenciamento: "",
        arquivo: null,
    });

    const [veterinarios, setVeterinarios] = useState([]); // Estado para armazenar os veterinários
    const navigate = useNavigate();

    // Busca os veterinários do backend ao carregar o componente
    useEffect(() => {
        const fetchVeterinarios = async () => {
            try {
                const response = await api.get("/vet/veterinarios"); // Faz a requisição para a rota que retorna os veterinários
                setVeterinarios(response.data.veterinarios || []);
            } catch (err) {
                console.error("Erro ao buscar veterinários:", err);
            }
        };

        fetchVeterinarios();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            arquivo: e.target.files[0],
        });
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const relatorioData = {
            Nome: formData.nomeGato,
            Sexo: formData.sexoGato,
            Cliente: formData.clienteCadastrado, // Aqui usamos o valor selecionado na dropdown
            Idade: formData.idadeGato,
            Raca: formData.racaGato,
            Material: formData.materialGenetico,
            Metodo: formData.sequenciamento,
        };

        try {
            const response = await api.post("/relatorios/novo-relatorio", relatorioData);
            alert(response.data.message); // Exibe uma mensagem de sucesso
            navigate("/loading"); // Redireciona após o cadastro
        } catch (err) {
            console.error("Erro ao cadastrar o relatório:", err);
            alert("Ocorreu um erro ao cadastrar o relatório.");
        }
    };

    return (
        <div className="cadastro-container">
            {/* Barra de progresso */}
            <div className={`progress-bar step-${currentStep}`}>    
                {["Passo 1", "Passo 2", "Passo 3"].map((step, index) => (
                    <div
                        key={index} 
                        className={`progress-step ${
                            currentStep === index + 1
                                ? "active"
                                : currentStep > index + 1
                                ? "completed"
                                : ""
                        }`}
                    >
                        {step}
                    </div>
                ))}
            </div>

            <form className="form-container" onSubmit={(e) => e.preventDefault()}>
                {/* Passo 1: Informações básicas do gato */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <h2>Informações Básicas do Gato</h2>
                        <div className="form-row">
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="nomeGato"
                                    value={formData.nomeGato}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Raça:
                                <input
                                    type="text"
                                    name="racaGato"
                                    value={formData.racaGato}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Idade:
                                <input
                                    type="number"
                                    name="idadeGato"
                                    value={formData.idadeGato}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Sexo:
                                <select
                                    name="sexoGato"
                                    value={formData.sexoGato}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </label>
                        </div>
                      
                    </div>
                )}

                {/* Passo 2: Informações da clínica veterinária */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <h2>Informações da Clínica Veterinária</h2>
                        <div className="form-row">
                            <label>
                                Nome da Empresa:
                                <input
                                    type="text"
                                    name="nomeClinica"
                                    value={formData.nomeClinica}
                                    onChange={handleChange}
                                    disabled={formData.clienteCadastrado !== "Não"} // Desabilitar se não for "Não"
                                />
                            </label>
                            <label>
                                Telefone:
                                <input
                                    type="tel"
                                    name="telefoneClinica"
                                    value={formData.telefoneClinica}
                                    onChange={handleChange}
                                    disabled={formData.clienteCadastrado !== "Não"} // Desabilitar se não for "Não"
                                />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="emailClinica"
                                    value={formData.emailClinica}
                                    onChange={handleChange}
                                    disabled={formData.clienteCadastrado !== "Não"} // Desabilitar se não for "Não"
                                />
                            </label>
                            <label>
                                Endereço:
                                <input
                                    type="text"
                                    name="enderecoClinica"
                                    value={formData.enderecoClinica}
                                    onChange={handleChange}
                                    disabled={formData.clienteCadastrado !== "Não"} // Desabilitar se não for "Não"
                                />
                            </label>
                        </div>
                        <label>
                            Já é cadastrado?
                            <select
                                name="clienteCadastrado"
                                value={formData.clienteCadastrado}
                                onChange={handleChange}
                            >
                                <option value="Não">Não</option>
                                {veterinarios.map((vet) => (
                                    <option key={vet.id} value={vet.Nome}>
                                        {vet.Nome}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}

                {/* Passo 3: Sobre a análise */}
                {currentStep === 3 && (
                    <div className="form-step">
                        <h2>Sobre a Análise</h2>
                        <label>
                            Material Genético:
                            <input
                                type="text"
                                name="materialGenetico"
                                value={formData.materialGenetico}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Sequenciamento:
                            <input
                                type="text"
                                name="sequenciamento"
                                value={formData.sequenciamento}
                                onChange={handleChange}
                            />
                        </label>
                        <label className="file-upload">
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                            <span>
                                {formData.arquivo ? formData.arquivo.name : "Escolha um arquivo"}
                            </span>
                        </label>
                    </div>
                )}

                {/* Botões de navegação */}
                <div className="nav-buttons">
                    {currentStep > 0 && (
                        <button type="button" onClick={prevStep} className="nav-button">
                            Anterior
                        </button>
                    )}
                    {currentStep < 3 ? (
                        <button type="button" onClick={nextStep} className="nav-button-next">
                            Próximo
                        </button>
                    ) : (
                        <button type="submit" onClick={handleSubmit} className="nav-button-finalizar">
                            Finalizar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
