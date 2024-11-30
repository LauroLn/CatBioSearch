import React, { useState } from "react";
import axios from "../../api"; 
import logoimage from "../../Components/assets/logo.svg";
import "../login/login.css";
import user from "../../Components/assets/mdi_user.svg";
import olho from "../../Components/assets/mdi_eye.svg";
import olhofechado from "../../Components/assets/mdi_eye-off.svg";
import gato from "../../Components/assets/Medicine-bro 1.svg";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpa mensagens de erro anteriores

    try {
      // Fazendo requisição ao back-end
      const response = await axios.post("/users", {
        Login: login,
        Password: password,
      });

      // Redireciona para a rota de dashboard com base no tipo de usuário
      if (response.status === 200) {
        window.location.href = response.data.Redirect;
      }
    } catch (error) {
      // Tratar erros de requisição
      if (error.response) {
        setErrorMessage(error.response.data.message || "Erro no login.");
      } else {
        setErrorMessage("Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <>
      <div className="areaLogin">
        <div className="loginarea">
          <div className="content">

            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <div className="login-title">
                  <h2>Login</h2>
                </div>

                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                  <img src={user} alt="Ícone de usuário" />
                </div>
                <div className="password-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <img
                    src={passwordVisible ? olho : olhofechado}
                    alt="Toggle password visibility"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                  />
                </div>
                <div className="button-signIn">
                  <button type="submit" className="button-style">
                    Entrar
                  </button>
                </div>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>

          <div className="gato">
            <div className="content-cat">
              <img src={gato} alt="Imagem de gato" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
