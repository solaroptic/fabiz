import React from "react";
import ButtonCSS from "../components-css/ButtonCSS.module.css";

const Button = ({ children, onClick, type, className }) => {
  return (
    <button
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
      className={ButtonCSS["standard"]}
    >
      {children}
    </button>
  );
};

export default Button;
