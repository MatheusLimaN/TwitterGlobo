import api from "../../services/api";
import { login } from "../../services/auth";
import React, { useState } from "react";
import './Login.css';

const Login = (props) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const _login = async e => {
        e.preventDefault();

        if (!user || !password) {
            setError("Preencha e-mail e senha para continuar!");
        } else {
            try {
                const response = await api.post("/login", { user, password });
                login(user, response.data.token);
                props.history.push("/admin");
            } catch (err) {
                setError("Houve um problema com o login, verifique suas credenciais.");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={_login} className="login-form">
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <input
                    type="user"
                    placeholder="Usuário"
                    onChange={e => setUser(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="default" type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;