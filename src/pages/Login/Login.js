import React, { useState } from "react";
import logo from "../../images/ivling.png";
import "../../theme/Styles.css";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";


const fakeLogin = async (username, password) => {
  if (!username || !password) {
    throw new Error("Preenche o email e a password.");
  }

  // Login local simulado — esta app não tem autenticação real nem base de dados de utilizadores.
  return {
    token: "local-demo-token",
  };
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
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

 const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fakeLogin(
      credentials.email,
      credentials.password
    ).catch((error) => {
      console.error("Login failed!", error.message);
      setLoginStatus(LOGIN_STATUS.ERROR);
    });

    if (response) {
      console.log("Login successful!", response);
      setLoginStatus(LOGIN_STATUS.SUCCESS);
      navigate("/ivlingInterface");
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="wrapper-login">
        <form onSubmit={handleSubmit}>
          {FORM_INPUTS.map((entry, index) => {
            const { label, id, ...rest } = entry;
            return (
              <div className="label" key={index}>
                <label className="email" htmlFor={id}>{label}</label>
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
              Os dados não existem ou estão incorretos!
            </small>
          )}
          <br />
          <div className="button">
            <button className="button button-container-login">ENTRAR</button>
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
      </div>
      <div className="footer-text">
        <p>
          <b>IVling by:</b> Rodolfo Escaleira 2024 |{" "}
          <Link to="/terms">Termos e Condições</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
