import React, { useState } from "react";
import logo from "../../images/ivling.png";
import "../../assets/css/Styles.css";
import Input from "../../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://reqres.in/api";

const fakeLogin = async (username, password) => {
  try {
    // Simulação de chamada à API de login usando Reqres
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: username, // Reqres usa "email" como identificador
      password,
    });

    // Verifica se o login foi bem-sucedido
    if (response.data.token) {
      return {
        token: response.data.token,
        // Outras informações do usuário, se disponíveis
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error) {
    throw new Error("Erro ao autenticar o usuário");
  }
};

const FORM_INPUTS = [
  { label: "Email:", id: "email", name: "email", type: "email" },
  { label: "Password:", id: "password", name: "password", type: "password" },
];

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Login Error or Success
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Credentials:", credentials);

    try {
      const response = await fakeLogin(
        credentials.username,
        credentials.password
      );
      console.log("Login successful!", response);
      setLoginStatus("success");
      // Lógica para definir o estado de autenticação no seu aplicativo
    } catch (error) {
      console.error("Login failed!", error.message);
      setLoginStatus("error");
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {FORM_INPUTS.map((entry, index) => {
            const { label, ...rest } = entry;
            return (
              <div key={index}>
                <label htmlFor={rest.id}>{label}</label>
                <Input {...rest} />
              </div>
            );
          })}
          {loginStatus === "success" && (
            <small className="loginSuccess">Bem vindo!</small>
          )}
          {loginStatus === "error" && (
            <small className="loginError">
              Os dados não existem ou estão incorretos.
            </small>
          )}
          <br />
          <div className="button">
            <Link to="/ivlinginterface" className="button button-container-login-register">ENTRAR</Link>
          </div>
          <div className="text">
            <p>
              Se não tem conta carregue <Link to="/register"><b>AQUI!</b></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
