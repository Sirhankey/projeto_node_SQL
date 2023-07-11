import React, { useState, useContext } from 'react';
import { Auth } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import './styles.css';


const Login = () => {

    const navigate = useNavigate();
    const { authenticated, logar } = useContext(Auth)

    const [email, setLogin] = useState('');
    const [password, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login Submit", { email, password })

        logar(email, password)
    }

    const cadastrar = () => {
        console.log("Cadastrar... route")
        navigate("/home");
    }

    return (
        <div id="login">
            <h1 className="">Login do Sistema</h1>
            <form className="form" onSubmit={handleSubmit}>

                <div className="field">
                    <label htmlFor="email">Login</label>
                    <input type="text" className="email" required
                        value={email} onChange={(event) => setLogin(event.target.value)} />
                </div>

                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input type="password" className="password" required
                        value={password} onChange={(event) => setSenha(event.target.value)} />
                </div>

                <div className="acao">
                    <button type='submit' className="logar">Logar</button>

                </div>

            </form>

            <p class="cad">Não Possui LOGIN?<br />
                Cadastre-se </p>

            <button onClick={cadastrar} className='btn-cadastrar'>Cadastrar</button>
        </div>
    )
}

export default Login;