import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

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
        <img src={src} alt="Profile" className="profilePic" />
      )}
    </span>
  );
};

export default ProfilePic;
