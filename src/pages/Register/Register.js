import React from "react";
import logo from "../../images/ivling.png";
import "../../theme/Styles.css";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const FORM_INPUTS = [
  { label: "Nome Completo:", id: "username", name: "username", type: "text" },
  {
    label: "Número de Identificação Fiscal:",
    id: "idFiscal",
    name: "idFiscal",
    type: "text",
  },

  { label: "Password:", id: "password", name: "password", type: "password" },
  {
    label: "Confirmar Password:",
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
  },
];

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
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

          <div className="button">
            <Link
              to="/ivlinginterface"
              className="button button-container-login-register"
            >
              REGISTAR
            </Link>
            <Link to="/" className="button button-container-back">
              VOLTAR
            </Link>
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

export default Register;
