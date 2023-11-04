import React from "react";
import BackIcon from "./BackIcon";
import NavBar from "./NavBar";
import styles from "../pages-css/Stories.module.css";

const Geneology = () => {
  return (
    <div className={styles["stories-container"]}>
      <NavBar />
      <BackIcon />
      <section className={styles["section-text"]}>
        <h1 className={styles["section-title"]}>Geneology</h1>
        <p>
          Tree(s) in progess...You provide the info and I'll compile, hash, and
          attempt a humble visual respresentation for the main branches who came
          over. I'd like to start with the eldest post-WWII name carriers and
          work backwards.
        </p>
        <p>Email at kumolanding@gmail.com</p>
      </section>
    </div>
  );
};

export default Geneology;
