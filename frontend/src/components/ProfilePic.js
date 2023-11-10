import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import styles from "../components-css/PicCSS.module.css";

const ProfilePic = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadImage = () => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      // setImage(img);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    loadImage();
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span>
      {isLoading ? (
        <Spinner />
      ) : (
        <img src={src} alt="Profile" className={styles["profile-pic"]} />
      )}
    </span>
  );
};

export default ProfilePic;
