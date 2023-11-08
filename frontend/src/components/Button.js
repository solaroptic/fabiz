import React from "react";
import styles from "../components-css/ButtonCSS.module.css";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} type="button" className={styles["standard"]}>
      {children}
    </button>
  );
};

export default Button;
