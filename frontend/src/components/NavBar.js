import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BsPersonCircle,
  BsFillQuestionCircleFill,
  BsShieldLockFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/userAuth/userAuthSlice";
import styles from "../components-css/NavBarCSS.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const logout = () => {
    navigate("/");
    dispatch(setLogout());
  };
  const handleClick = () => {
    const userID = user._id;
    try {
      navigate(`/profile/:${userID}`, { state: { profileState: user } });
    } catch (error) {
      if (error.status === 404) {
        console.log("User not found");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles["nav-div-container"]}>
      {isAuth && (
        <BsPersonCircle
          onClick={handleClick}
          className={`${styles["nav-links"]} ${styles["nav-face"]}`}
          style={{ cursor: "pointer" }}
        />
      )}
      {isAuth && <p className={styles["nav-links"]}>{user.userName}</p>}
      {!isAuth && (
        <BsFillQuestionCircleFill
          className={`${styles["nav-links"]} ${styles["nav-adjust"]}`}
        />
      )}
      {isAuth && (
        <Link to="/list" className={styles["nav-links"]}>
          The List
        </Link>
      )}
      {!isAuth && (
        <div style={{ display: "flex" }}>
          <BsShieldLockFill
            className={styles["nav-links"]}
            style={{ marginTop: "0.5rem" }}
          />
          <span className={styles["nav-links"]}>List</span>
        </div>
      )}
      {!isAuth && (
        <Link to="/login" className={styles["nav-links"]}>
          Login/Sign-Up
        </Link>
      )}
      {isAuth && (
        <span onClick={logout} className={styles["nav-links"]}>
          Logout
        </span>
      )}
    </div>
  );
};

export default NavBar;
