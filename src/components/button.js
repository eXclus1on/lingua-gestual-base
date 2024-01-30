import React from "react";
import "./Button.css";

const Button = (props) => {
  const { children, theme, icon, onClick } = props;

  return (
    <button className={`button button--${theme}`} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
};

export default Button;