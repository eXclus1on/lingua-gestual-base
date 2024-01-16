import React from "react";
import logo from "../../images/ivling.png";
import "./Register.css";
import Input from "../../components/Input";

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
    <div className="register-container">
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
          <br />
          <button className="button-submit" type="submit">
            SUBMETER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
