import React from "react";
import ProfilePic from "../components/ProfilePic";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BackIcon from "components/BackIcon";
import NavBar from "components/NavBar";
import { chatToDB, setChats } from "redux/chat/chatMessageSlice";
import { setSelectedChat } from "redux/userAuth/userAuthSlice";
import Button from "../components/Button";
import styles from "../pages-css/Profile.module.css";

const Profile = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.MsgChats);
  const person =
    state.profileState.userName === user?.userName ? user : state.profileState;

  const setUpChat = async () => {
    const data = await dispatch(chatToDB(state.profileState._id));
    if (!chats.find((c) => c._id === data._id))
      dispatch(setChats([data.payload, ...chats]));
    dispatch(setSelectedChat(data.payload));
    navigate(`/messages`, { state: { other: person } });
  };
  const renderButton = () => {
    if (user.notifications.length > 0) {
      return (
        <>
          <span className={styles["span-notify"]}>
            {user.notifications.length}
          </span>
          <Button>MESSAGE BOX</Button>
        </>
      );
    } else {
      return <Button>MESSAGE BOX</Button>;
    }
  };
  // ////////////////JSX////////////////
  return (
    <div className={styles["profile-container"]}>
      <NavBar />
      <BackIcon />
      {user?.userName === person.userName && (
        <Link to="/profile-edit" className={styles["button-settings"]}>
          <IoSettingsSharp style={{ fontSize: "var(--largeFont)" }} />
        </Link>
      )}
      <header className={styles["header-pic"]}>
        <ProfilePic
          src={person?.picturePath}
          alt="Profile photo"
          id={styles["profile-pic"]}
        />
      </header>
      <section className={styles["section-info"]}>
        <p>{person?.userName}</p>
        <div className={styles["response-div-info"]}>
          <h2>Location:</h2>
          <p>{person?.location}</p>
        </div>
        <div className={styles["response-div-info"]}>
          <h2>About:</h2>
          <p>{person?.about}</p>
        </div>
        <div className={styles["response-div-info"]}>
          <h2>News:</h2>
          <p>{person?.news}</p>
        </div>
        {person?.userName === user?.userName ? (
          <Link to="/messages">{renderButton()}</Link>
        ) : (
          <Button onClick={setUpChat}>MESSAGE</Button>
        )}
      </section>
    </div>
  );
};

export default Profile;
