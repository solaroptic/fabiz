import React from "react";
import ButtonCSS from "../components-css/ButtonCSS.module.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} type="button" className={ButtonCSS["standard"]}>
      {children}
    </button>
  );
};

export default Button;
