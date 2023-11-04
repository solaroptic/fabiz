import { Center, InputGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerToDb } from "redux/user/userSlice";
import * as yup from "yup";
import styles from "../pages-css/Login.module.css";

const NewRegister = ({ toLogIn }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const registerSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    passwordConfirmation: yup
      .string()
      .required("Please re-type your password.")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const initialValuesRegister = {
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const register = async (values) => {
    const dataObj = {};
    for (const key in values) {
      dataObj[key] = values[key];
    }
    const savedUserResponse = await dispatch(registerToDb(dataObj));
    const savedUser = savedUserResponse;
    if (savedUser.meta.requestStatus === "fulfilled") {
      toLogIn();
    }
  };

  return (
    <div className={styles["login-cats"]}>
      <Formik
        onSubmit={register}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
      >
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Center fontSize="var(--largeFont)">Sign Up!</Center>
            <label className={styles["login-labels"]}>Username</label>
            <input
              className={styles["login-inputs"]}
              placeholder="Create a username"
              type="text"
              label="UserName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
              required
            />
            <label className={styles["login-labels"]}>Email</label>
            <input
              className={styles["login-inputs"]}
              placeholder="JohnDoeszewski@gmail.com"
              type="email"
              label="UserName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              required
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
                size="sm"
                onClick={() => setIsShow(!isShow)}
              >
                {isShow ? "hide" : "show"}
              </button>
            </InputGroup>
            <label className={styles["login-labels"]}>Verify Password</label>
            <InputGroup>
              <input
                className={styles["login-inputs"]}
                placeholder="enter your password"
                type={isShow ? "text" : "password"}
                label="Verify Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passwordConfirmation}
                name="passwordConfirmation"
                required
              />
              <button
                className={styles["login-button-show"]}
                onClick={() => setIsShow(!isShow)}
              >
                {isShow ? "hide" : "show"}
              </button>
            </InputGroup>
            <button type="submit" className={styles["login-button-account"]}>
              Register
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewRegister;
