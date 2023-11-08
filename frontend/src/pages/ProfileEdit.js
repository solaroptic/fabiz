import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "components/BackIcon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { setNewUser, setPic } from "redux/userAuth/userAuthSlice";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  sendImageToCloud,
  sendPicToDb,
  sendUserInfoToDb,
} from "redux/profile/profileSlice";
import Button from "../components/Button";
import styles from "../pages-css/ProfileEdit.module.css";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingPic, setIsUpdatingPic] = useState(false);
  const id = user._id;
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    userName: user.userName,
    location: user.location,
    about: user.about,
    news: user.news,
    //////////////////////////////////////////
  };
  const handleImage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await dispatch(sendPicToDb(image));
      console.log(data);
      setIsLoading(false);
      dispatch(setPic(image));
      navigate("/");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const uploadPic = async (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please select a JPEG or PNG image",
        status: "warning",
        duration: "3000",
        isClosable: "true",
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setIsLoading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "fabiz_site");
      data.append("cloud_name", "duysbh0j0");
      const imageUrl = await dispatch(sendImageToCloud(data));
      setImage(imageUrl.payload.toString());
      setIsLoading(false);

      setIsLoading(false);
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: "3000",
        isClosable: "true",
        position: "bottom",
      });

      return;
    }
  };
  //////////////////////////////
  const handleFormSubmit = async (e, values) => {
    e.preventDefault();
    console.log("🧨 profile edit data submit btn");
    try {
      const payload = {
        location: values.location,
        news: values.news,
        about: values.about,
        userName: values.userName,
      };
      const data = await dispatch(sendUserInfoToDb(payload));
      console.log(data);
      dispatch(setNewUser(payload));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = yup.object();

  return (
    <div className={styles["edit-div-container"]}>
      <BackIcon />
      {!isUpdatingPic && (
        <div
          className={styles["pic-form-containerA"]}
          onClick={() => setIsUpdatingPic(!isUpdatingPic)}
        >
          <MdOutlineAddPhotoAlternate style={{ fontSize: "3rem" }} />
          Update your pic?
        </div>
      )}
      {isUpdatingPic && (
        <form className={styles["pic-form-container"]} id="pic">
          <label>Upload File:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadPic(e.target.files[0])}
          />
          <button
            type="submit"
            className={styles["pic-button-submit"]}
            onClick={handleImage}
            isLoading={isLoading}
          >
            Submit Pic
          </button>
        </form>
      )}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles["edit-form-info"]}>
            <h1>Profile Edit</h1>
            <label>Username</label>
            <input
              type="text"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label>About</label>
            <textarea
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label>News</label>
            <textarea
              name="news"
              value={values.news}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit">Submit Edit</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEdit;
