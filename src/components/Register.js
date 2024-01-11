import React from "react";
import logo from "d:/_Front-end-project/lingua-gestual-base/src/images/ivling.png"; // Importa o logotipo (ajusta o caminho conforme necessário)
import "./Register.css";
import Input from "./Input";

const FORM_INPUTS = [
  { label: "Nome Completo:", id: "username", name: "username", type: "text" },
  { label: "Número de Identificação Fiscal:", id: "idFiscal", name: "idFiscal", type: "text" },
  { label: "Password:", id: "password", name: "password", type: "password" },
  { label: "Confirmar Password:", id: "confirmPassword", name: "confirmPassword", type: "password" },
];

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="register-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          {FORM_INPUTS.map((entry, index) => {
            const { label, ...rest } = entry;

            return (
                
              <Input {...rest} key={`${index}`}>
              <br></br>
                {label}
                <br></br>
              </Input>
            );
          })}
          <br></br>
          <button className="button-submit" type="submit">
            Submeter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
