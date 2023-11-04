import React from "react";
import BackIcon from "./BackIcon";
import NavBar from "./NavBar";
import styles from "../pages-css/Stories.module.css";

const Story = () => {
  return (
    <div className={styles["stories-container"]}>
      <NavBar />
      <BackIcon />
      <section className={styles["section-text"]}>
        <h1 className={styles["section-title"]}>The Story</h1>
        <p className={styles["indented"]}>
          It was a unusually windy Autumn evening...well, ok. In the 15th and
          16th centuries, there was a wave of immigration to Poland from other
          parts of Europe, including Germany, Italy, and France. Many of these
          immigrants bore the surname Fabian, and they settled in various parts
          of Poland. Fabian is commonly interpreted as bean-grower. Yay! I've
          found that the central and northeastern areas of Poland (where we are
          found) have high quantities of bean fields...There may have been a
          place or series of fields called Fabisz***; it could simply be an
          indigenous group of Poles from the Polens era, pre-1000AD. Not the
          glamorous origin story I was looking for, but it is what it is.
        </p>
        <p className={styles["indented"]}>
          The oldest reference to a Fabian is Sir Fabian z Czernina of Lesser
          Poland (Polish nobleman who served as voivode of Kraków from 1423 to
          1434). The first recorded Fabiszewski in Poland was a certain Maciej
          Fabiszewski, who lived in Kraków in the 15th century. Also in Kraków,
          a Fabianski merchant was found in tax records of 1629; later
          Fabianowski in Lublin, 1674. Lviv also had some Fabianskis in that
          era. After the 1600s, it was no longer a noble-only surname and was
          adopted by various groups for different reasons. Most of us seem to
          have some roots 50 miles northwest of Warsaw. The town of Mochowo
          (Mokovo) has been pointed to as a source. I'm especially interested in
          what was going on from around 1780-1850; of course anything earlier
          (good luck).
        </p>
        <p className={styles["indented"]}>
          Apparently, in the 1850s, sickness, flooding, and lack of political
          freedom caused many people to look for new places to call home. By the
          turn of the century a millions plus Poles had come from 1865-1914.
          Currently, most of the Fabiszewskis seem to be concentrated in the
          Bialystok area of the Podlaskie Voivodeship (~3,000 people); not sure
          why. This is the most diverse region of Poland and over many parts of
          history, it was separate from Poland. Were they there to begin with?
          All of these names (Fabiański Fabisiak Fabianowski Fabian Fabiuk
          Fabiszew Fabisiewicz Fabisheski Fabiseski) are thought of as
          essentially the same origin.
        </p>
      </section>
    </div>
  );
};

export default Story;
