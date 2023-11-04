import React from "react";
import { factData } from "../utility/FactData";
import BackIcon from "./BackIcon";
import NavBar from "./NavBar";
import styles from "../pages-css/Stories.module.css";

const Facts = () => {
  // ///////Fact mapping/////
  const mappedFacts = factData.map((fact) => {
    return (
      <div key={fact.id} className={styles["stories-div-q-a"]}>
        <p className={styles["stories-p-q"]}>{fact.question}</p>
        <p className={styles["stories-p-answer"]}>{fact.answer}</p>
      </div>
    );
  });
  // JSX/////////////////////
  return (
    <div className={styles["stories-container"]}>
      <NavBar />
      <BackIcon />
      <section className={styles["section-text"]}>
        <h1 className={styles["section-title"]}>Fab Facts</h1>
        <p className={styles["stories-p-answer"]}>
          Disclaimer: "Facts" is used quite loosely here, we'll operate by
          consensus and not take it too seriously.
        </p>
        {mappedFacts}
      </section>
    </div>
  );
};

export default Facts;
