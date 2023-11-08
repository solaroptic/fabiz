import React, { useState } from "react";
import NewRegister from "../components/NewRegister";
import { setLogin } from "redux/userAuth/userAuthSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Center, InputGroup } from "@chakra-ui/react";
import BackIcon from "components/BackIcon";
import { logintoDb } from "redux/user/userSlice";
import Fields from "../assets/fields.jpg";
import styles from "../pages-css/Login.module.css";

const Login = () => {
  const [isNew, setIsNew] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const toLogIn = () => {
    setIsNew(false);
  };

  const login = async (values, onSubmitProps) => {
    try {
      console.log(values, "👖 loginvalues");
      const loggedInResponse = await dispatch(logintoDb(values));
      onSubmitProps.resetForm();
      if (loggedInResponse) {
        dispatch(
          setLogin({
            user: loggedInResponse.payload.user,
            token: loggedInResponse.payload.token,
          })
        );
        localStorage.setItem("fabianPassword", values.password);
        // resetForm();
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BackIcon />
      <div className={styles.loginPage} color={"var(--primary)"}>
        <div className={styles["login-container"]}>
          <div className={styles["login-div-stack"]}>
            <Formik
              onSubmit={login}
              initialValues={initialValuesLogin}
              validationSchema={loginSchema}
            >
              {({ values, handleBlur, handleChange, handleSubmit }) => (
                <div className={styles["login-cats"]}>
                  {!isNew && (
                    <img
                      src={Fields}
                      className={styles["login-img"]}
                      alt="Rolling bean fields"
                    />
                  )}
                  <Center fontSize="var(--largeFont) ">Login</Center>
                  <form onSubmit={handleSubmit}>
                    <label className={styles["login-labels"]}>Email</label>
                    <input
                      className={styles["login-inputs"]}
                      placeholder="johnDoeiszewski@gmail.com"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                    />
                    <label className={styles["login-labels"]}>Password</label>
                    <InputGroup>
                      <input
                        className={styles["login-inputs"]}
                        placeholder="enter your password"
                        label="Password"
                        type={isShow ? "text" : "password"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                      />

                      <button
                        className={styles["login-button-show"]}
                        onClick={() => setIsShow(!isShow)}
                        letterSpacing={"wide"}
                      >
                        {isShow ? "hide" : "show"}
                      </button>
                    </InputGroup>
                    <button
                      className={styles["login-button-submit"]}
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}
            </Formik>
          </div>
          <button
            className={styles["login-button-account"]}
            onClick={() => setIsNew(!isNew)}
          >
            Don't have an account?
          </button>
          {isNew && <NewRegister toLogIn={toLogIn} />}
        </div>
      </div>
    </>
  );
};

export default Login;
