import React, { useState } from 'react';
import logoimage from '../assets/logo.svg';
import '../login/login.css';
import user from '../assets/mdi_user.svg'
import olho from '../assets/mdi_eye.svg'
import olhofechado from '../assets/mdi_eye-off.svg'
import gato from '../assets/pexels-guvo-28994030-removebg-preview 1.svg'
import '../primeiroAcesso/acess.css'

let logo = logoimage;
let userimg = user;
let visiblePass = olho;
let unvisiblePass = olhofechado
let gatoImg = gato

import './acess.css'

function Acess() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <>
            <div className="areaContent">

                <div className="content-gato">
                    <img className='logo' src={logo} alt="" />
                    <img className='gato' src={gatoImg} alt="" />
                </div>

                <div className="content-page">
                    <div className="content-input">
                        <div className="text-acess">
                            <h2>Primeiro Acesso</h2>
                        </div>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Usuário" />
                            <img src={userimg} alt="Ícone" />
                        </div>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Digite sua senha"
                            />
                            <img
                                src={passwordVisible ? visiblePass : unvisiblePass}
                                alt="Toggle password visibility"
                                onClick={togglePasswordVisibility}
                                className="toggle-password"
                            />
                        </div>
                        <div className="password-wrapper">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirme sua senha"
                            />
                            <img
                                src={passwordVisible ? visiblePass : unvisiblePass}
                                alt="Toggle password visibility"
                                onClick={togglePasswordVisibility}
                                className="toggle-password"
                            />
                        </div>
                        <div className="button-acess">
                            <a className='button' href="">Entrar</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Acess