import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../pages-css/List.module.css";

const Member = ({ member, id, profilePictureUrl, name, location }) => {
  const notifications = useSelector((state) => state.auth.user.notifications);
  const navigate = useNavigate();
  const isHighlight = notifications.includes(name);

  const handleClick = () => {
    // setMemberInfo(member);
    try {
      navigate(`/profile/:${id}`, { state: { profileState: member } });
    } catch (error) {
      if (error.status === 404) {
        console.log("User not found");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles["member-div-container"]}>
      <div
        className={`${styles["member-div-box"]} ${
          isHighlight && styles["member-div-highlight"]
        }`}
        onClick={handleClick}
      >
        <img
          src={profilePictureUrl}
          alt="Profile of user"
          className={styles["member-image"]}
        />
        <div className={styles["member-div-data"]}>
          <h2>{name}</h2>
          {location ? <span>{location}</span> : <div>"Somewhere..."</div>}
        </div>
      </div>
    </div>
  );
};

export default Member;
