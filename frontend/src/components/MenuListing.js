import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setSelectedChat,
} from "../redux/userAuth/userAuthSlice";
import { updatedNotificationsToDb } from "redux/user/userSlice";
import styles from "../components-css/SideDrawerCSS.module.css";

const MenuListing = () => {
  const { user } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.MsgChats);
  const dispatch = useDispatch();

  const handleNoteClick = (sender) => {
    let selectedChatLocal;
    chats.forEach((chat) => {
      if (
        chat.users[0].userName === sender ||
        chat.users[1].userName === sender
      ) {
        selectedChatLocal = chat;
      } else {
        return;
      }
    });
    const newNotifications = user.notifications.filter((notification) => {
      return notification !== sender;
    });

    dispatch(setSelectedChat(selectedChatLocal));
    dispatch(setNotifications(newNotifications));
    dispatch(updatedNotificationsToDb(newNotifications));
  };

  return (
    <div className={styles["menuListing-container"]}>
      {!user.notifications?.length && (
        <aside className={styles["menuListing-listing"]}>
          No new messages.
        </aside>
      )}
      {user.notifications.map((note) => (
        <aside
          className={styles["menuListing-listing"]}
          key={note}
          onClick={() => handleNoteClick(note)}
        >
          New message from {note}
        </aside>
      ))}
    </div>
  );
};

export default MenuListing;
