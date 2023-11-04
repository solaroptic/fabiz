import React from "react";
import { ImSpinner9 } from "react-icons/im";
import styles from "../components-css/SpinnerCSS.module.css";
function Spinner() {
  return (
    <div className={styles["loadingSpinnerContainer"]}>
      <ImSpinner9 className={styles["loadingSpinner"]} />
      <span className={styles["spinner-letter"]}>F</span>
    </div>
  );
}

export default Spinner;
