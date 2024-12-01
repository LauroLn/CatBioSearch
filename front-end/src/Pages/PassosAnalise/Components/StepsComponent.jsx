import React, { useState } from "react";

const CustomSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Informações Básicas",
      content: (
        <div>
          <h3>Etapa 1: Informações Básicas</h3>
          <label>Nome</label>
          <input type="text" placeholder="Digite o nome" />
          <br />
          <label>Idade</label>
          <input type="number" placeholder="Digite a idade" />
        </div>
      ),
    },
    {
      title: "Informações Adicionais",
      content: (
        <div>
          <h3>Etapa 2: Informações Adicionais</h3>
          <label>Endereço</label>
          <input type="text" placeholder="Digite o endereço" />
          <br />
          <label>Telefone</label>
          <input type="tel" placeholder="Digite o telefone" />
        </div>
      ),
    },
    {
      title: "Confirmação",
      content: (
        <div>
          <h3>Etapa 3: Confirmação</h3>
          <p>Revise os dados antes de enviar.</p>
          <button onClick={() => alert("Formulário enviado!")}>
            Enviar
          </button>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
      {/* Header com títulos dos steps */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              borderBottom: index === currentStep ? "2px solid blue" : "1px solid gray",
              color: index === currentStep ? "blue" : "gray",
            }}
          >
            {step.title}
          </div>
        ))}
      </div>

      {/* Conteúdo do step atual */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
        {steps[currentStep].content}
      </div>

      {/* Botões de navegação */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          style={{
            padding: "10px 20px",
            backgroundColor: currentStep === 0 ? "#ddd" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
          }}
        >
          Voltar
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          style={{
            padding: "10px 20px",
            backgroundColor: currentStep === steps.length - 1 ? "#ddd" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep === steps.length - 1 ? "not-allowed" : "pointer",
          }}
        >
          {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
        </button>
      </div>
    </div>
  );
};

export default CustomSteps;
