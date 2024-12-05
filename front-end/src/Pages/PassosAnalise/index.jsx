import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

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
        clienteCadastrado: false,
        materialGenetico: "",
        sequenciamento: "",
        arquivo: null,
    });

    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);
    };

    return (
        <div className="cadastro-container">
            {/* Barra de progresso */}
            <div className="progress-bar">
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

            <form className="form-container" onSubmit={handleSubmit}>
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
                        {/* Botão "Voltar" aparece apenas no primeiro passo */}
                        <button
                            type="button"
                            className="nav-button back-home"
                            onClick={() => navigate("/")}
                        >
                            Voltar
                        </button>
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
                                />
                            </label>
                            <label>
                                Telefone:
                                <input
                                    type="tel"
                                    name="telefoneClinica"
                                    value={formData.telefoneClinica}
                                    onChange={handleChange}
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
                                />
                            </label>
                            <label>
                                Endereço:
                                <input
                                    type="text"
                                    name="enderecoClinica"
                                    value={formData.enderecoClinica}
                                    onChange={handleChange}
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
                                <option value={false}>Não</option>
                                <option value={true}>Sim</option>
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
                            <span>Escolha um arquivo</span>
                        </label>
                    </div>
                )}

                {/* Botões de navegação */}
                <div className="nav-buttons">
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="nav-button">
                            Anterior
                        </button>
                    )}
                    {currentStep < 3 ? (
                        <button type="button" onClick={nextStep} className="nav-button next">
                            Próximo
                        </button>
                    ) : (
                        <button type="submit" className="nav-button finalizar">
                            Finalizar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
