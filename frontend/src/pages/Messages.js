import React, { useState } from "react";
import { useSelector } from "react-redux";
import SideDrawer from "components/SideDrawer";
import MyChats from "components/MyChats";
import BackIcon from "components/BackIcon";
import { useLocation } from "react-router-dom";
import styles from "../pages-css/Messages.module.css";
import SingleChat from "components/SingleChat";

const Messages = () => {
  console.log("Messages - Parent runs");
  const { state } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [isFetchAgain, setIsFetchAgain] = useState();

  return (
    <div className={styles["messages-div-container"]}>
      <BackIcon />
      {user && <SideDrawer state={state || null} />}
      <div className={styles["messages-div-chatBoxes"]}>
        {user && <MyChats isFetchAgain={isFetchAgain} />}
        {user && (
          <SingleChat
            isFetchAgain={isFetchAgain}
            setIsFetchAgain={setIsFetchAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
