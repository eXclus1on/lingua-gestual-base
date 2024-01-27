import React, { useEffect, useState } from "react";
import logo from "../../images/ivling.png";
import "../../theme/Styles.css";
import Input from "../../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://reqres.in/api";

const fakeLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: username, // Reqres usa "email" como identificador
      password,
    });

    if (response.data.token) {
      return {
        token: response.data.token,
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error) {
    throw new Error("Erro ao autenticar o usuário");
  }
};

const LOGIN_STATUS = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const FORM_INPUTS = [
  { label: "Email:", id: "email", name: "email", type: "email" },
  { label: "Password:", id: "password", name: "password", type: "password" },
];

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("credentials", credentials);
  }, [credentials]);

  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Credentials:", credentials);

    const response = await fakeLogin(
      credentials.username,
      credentials.password
    ).catch((error) => {
      console.error("Login failed!", error.message);
      setLoginStatus(LOGIN_STATUS.ERROR);
    });

    if (response) {
      console.log("Login successful!", response);
      setLoginStatus(LOGIN_STATUS.SUCCESS);
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
            const { label, id, ...rest } = entry;
            return (
              <div key={index}>
                <label htmlFor={id}>{label}</label>
                <Input
                  {...rest}
                  id={id}
                  onChange={(event) => {
                    setLoginStatus(null);
                    setCredentials({
                      ...credentials,
                      [id]: event.target.value,
                    });
                  }}
                />
              </div>
            );
          })}
          {loginStatus === LOGIN_STATUS.SUCCESS && (
            <small className="loginSuccess">Bem vindo!</small>
          )}
          {loginStatus === LOGIN_STATUS.ERROR && (
            <small className="loginError">
              Os dados não existem ou estão incorretos.
            </small>
          )}
          <br />
          <div className="button">
            <button className="button button-container-login-register">
              ENTRAR
            </button>
          </div>
          <div className="text">
            <p>
              Se não tem conta carregue{" "}
              <Link to="/register">
                <b>AQUI!</b>
              </Link>
            </p>
          </div>
        </form>
        <Link
          to="/ivlinginterface"
          className="button button-container-login-register"
        >
          Boycott
        </Link>
      </div>
      <div className="footer-text">
        <p>
          <b>IVling by:</b> Rodolfo Escaleira 2024 | <Link to="/terms">Termos e Condições</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
