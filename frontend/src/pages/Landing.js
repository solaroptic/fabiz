import NavBar from "components/NavBar";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../pages-css/Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logintoDb } from "redux/user/userSlice";
import { setLogin } from "redux/userAuth/userAuthSlice";

const Landing = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  useEffect(() => {
    console.log("🧨🧨", isAuth);
    if (isAuth) {
      const login = async () => {
        try {
          const originalPassword = localStorage.getItem("fabianPassword");
          const values = {
            email: user?.email,
            password: originalPassword,
          };
          console.log(values, "👖 landingvalues");
          const loggedInResponse = await dispatch(logintoDb(values));
          if (loggedInResponse) {
            dispatch(
              setLogin({
                user: loggedInResponse.payload.user,
                token: loggedInResponse.payload.token,
              })
            );
          }
        } catch (error) {
          console.error(error);
        }
      };
      login();
    }
  }, [isAuth]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles["background-div-layer"]}>
      <NavBar />

      <div className={styles["text-div-container"]}>
        <h1 className={styles["text-h1-heading"]}>Project Fabian</h1>
        <header className={styles["landing-text"]}>
          <section className={styles["text-section-select"]}>
            <Link to="/facts">Fab-Facts</Link>
            <Link to="/story">Story</Link>
            <Link to="/geneology">Geneology</Link>
          </section>
        </header>
        <section className={styles["message-section"]}>
          <h2 className={styles["message-h2-heading"]}>Message Board</h2>
          <p className={styles["message-p-text"]}>
            Welcoming all Fabis******s: (Fabiszewski Fabiański Fabisiak
            Fabianowski Fabian Fabisiewicz Fabiseski and so on).
          </p>
        </section>
      </div>
      <img
        className={styles["img-map"]}
        src={require(`../assets/Map2.avif`)}
        alt="United States with highlighting states where Fabiszewskis live."
      />
    </div>
  );
};

export default Landing;
