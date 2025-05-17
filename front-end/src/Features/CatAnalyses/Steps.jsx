import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Certifique-se de que o caminho está correto
import "../CatAnalyses/PassosAnalise/style.css";
import Sidebar from "../../Templates/Sidebar/Sidebar";
import passo1Img from "../../../src/Components/assets/el_ok-circle.svg";
import passo2Img from "../../../src/Components/assets/el_ok-circle.svg";
import passo3Img from "../../../src/Components/assets/el_ok-circle.svg";


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
    const [expanded, setExpanded] = useState(false);
    const passoImgs = [passo1Img, passo2Img, passo3Img];


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

        const nextStep = () => {
            if (currentStep === 1) {
                if (!formData.nomeGato || !formData.racaGato || !formData.idadeGato || !formData.sexoGato) {
                    alert("Preencha todos os campos do passo 1.");
                    return;
                }
            }
            if (currentStep === 2 && formData.clienteCadastrado === "Não") {
                if (!formData.nomeClinica || !formData.telefoneClinica || !formData.emailClinica || !formData.enderecoClinica) {
                    alert("Preencha todos os campos da clínica.");
                    return;
                }
            }
            setCurrentStep(currentStep + 1);
        };

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

            <Sidebar
                expanded={expanded}
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            />

            <div className={`main-content ${expanded ? 'sidebar-expanded' : ''}`}>

                <div className={`progress-bar step-${currentStep}`}>
                    {[1, 2, 3].map((step, index) => (
                        <div
                            key={index}
                            className={`progress-step ${currentStep === step
                                    ? "active-step"
                                    : currentStep > step
                                        ? "completed"
                                        : ""
                                }`}
                        >
                            {currentStep !== step && (
                                <img src={passoImgs[index]} alt={`Passo ${step}`} className="passo-img" />
                            )}
                            <span>Passo {step}</span>
                        </div>
                    ))}
                </div>

                <form className="form-container" onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div className="form-step">
                            <div className="form-row">
                                <label>
                                    Nome do Gato
                                    <input
                                        type="text"
                                        name="nomeGato"
                                        value={formData.nomeGato}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Raça do Gato
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
                                    Idade do Gato
                                    <input
                                        type="number"
                                        name="idadeGato"
                                        value={formData.idadeGato}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Sexo
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

                    {currentStep === 2 && (
                        <div className="form-step">
                            <div className="form-row">
                                <label>
                                    Cliente já é cadastrado?
                                    <select
                                        name="clienteCadastrado"
                                        value={formData.clienteCadastrado}
                                        onChange={handleChange}
                                    >
                                        <option value="Não">Não</option>
                                        <option value="Sim">Sim</option>
                                    </select>
                                </label>
                            </div>

                            {formData.clienteCadastrado === "Não" && (
                                <>
                                    <div className="form-row">
                                        <label>
                                            Nome da Clínica
                                            <input
                                                type="text"
                                                name="nomeClinica"
                                                value={formData.nomeClinica}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>
                                            Telefone
                                            <input
                                                type="text"
                                                name="telefoneClinica"
                                                value={formData.telefoneClinica}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-row">
                                        <label>
                                            Email
                                            <input
                                                type="email"
                                                name="emailClinica"
                                                value={formData.emailClinica}
                                                onChange={handleChange}
                                            />
                                        </label>
                                        <label>
                                            Endereço
                                            <textarea
                                                name="enderecoClinica"
                                                value={formData.enderecoClinica}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="form-step">
                            <div className="form-row">
                                <label>
                                    Material Genético
                                    <input
                                        type="text"
                                        name="materialGenetico"
                                        value={formData.materialGenetico}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Tipo de Sequenciamento
                                    <input
                                        type="text"
                                        name="sequenciamento"
                                        value={formData.sequenciamento}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <label className="file-upload">
                                <input type="file" name="arquivo" onChange={handleFileChange} />
                                <span>Selecione o arquivo</span>
                            </label>
                        </div>
                    )}

                    <div className="nav-buttons">
                        {currentStep > 1 && (
                            <button type="button" onClick={prevStep} className="nav-button">
                                Voltar
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button type="button" onClick={nextStep} className="nav-button-next">
                                Próximo
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button type="submit" className="nav-button-finalizar">
                                Finalizar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;
