
import React, { useState } from 'react';
import logoimage from '../../Components/assets/logo.svg';
import '../login/login.css';
import user from '../../Components/assets/mdi_eye-off.svg';
import olho from '../../Components/assets/mdi_eye.svg';
import olhofechado from '../../Components/assets/mdi_user.svg'
import gato from '../../Components/assets/pexels-wojciech-kumpicki-1084687-2071882-removebg-preview 1.svg'

let logo = logoimage;
let userimg = user;
let visiblePass = olho;
let unvisiblePass = olhofechado
let gatoImg = gato

function Login() {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <div className="areaLogin">

                <div className="loginarea">

                    <div className="content">

                        <img className='logo' src={logo} alt="" />
                        <div className="inputs">
                            <div className="login-title">
                                <h2>Login</h2>
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
                            <div className="button-signIn">
                                <a className='button-style' href="">Entrar</a>
                            </div>
                        </div>





                    </div>
                    <div className="gato">
                        <div className="content-cat">
                            <img src={gatoImg} alt="" />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}



export default Login