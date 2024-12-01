import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Step1 from "./InfoBasica/Step1";
import Step2 from "./InfoBasica/Step2";
import Step3 from "./InfoBasica/Step3";

const Cadastro = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Definindo rotas para os passos */}
            <Routes>
                <Route
                    path="/step1"
                    element={<Step1 nextStep={() => navigate("/step2")} />}
                />
                <Route
                    path="/step2"
                    element={
                        <Step2
                            nextStep={() => navigate("/step3")}
                            prevStep={() => navigate("/step1")}
                        />
                    }
                />
                <Route
                    path="/step3"
                    element={<Step3 prevStep={() => navigate("/step2")} />}
                />
            </Routes>
        </div>
    );
};

export default Cadastro;
