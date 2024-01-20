import React from "react";
import logo from "../../images/ivling.png";
import "../../assets/css/Styles.css"
import Input from "../../components/Input";

const FORM_INPUTS = [
  { label: "Email:",
  id: "email",
  name: "email",
  type: "email"
  },
  { label: "Password:",
    id: "password",
    name: "password",
    type: "password"
  },
];

const Login = () => {
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
          <br />
          <button className="button-container-login-register" type="submit">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
