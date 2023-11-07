// import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotifications,
  setSelectedChat,
} from "../redux/userAuth/userAuthSlice";
import ChatLoading from "./ChatLoading";
import styles from "../components-css/MyChatsCSS.module.css";
import { updatedNotificationsToDb } from "redux/user/userSlice";
import { chatsFromDb } from "redux/chat/chatMessageSlice";

const MyChats = ({ isFetchAgain }) => {
  const dispatch = useDispatch();
  const { user, selectedChat } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.MsgChats);
  const toast = useToast();

  const getSender = (user, users) => {
    return users[0]?._id === user?._id
      ? users[1]?.userName
      : users[0]?.userName;
  };

  const handleBoxClick = (chat) => {
    dispatch(setSelectedChat(chat));
    const oldNotifications = user.notifications.length;
    const newNotifications = user.notifications.filter((notification) => {
      return notification !== getSender(user, chat.users);
    });
    if (oldNotifications !== newNotifications.length) {
      dispatch(setNotifications(newNotifications));
      dispatch(updatedNotificationsToDb(newNotifications));
    }
  };
  const fetchChats = async () => {
    try {
      await dispatch(chatsFromDb());
    } catch (error) {
      toast({
        title: "Error retrieving chat!",
        status: "error",
        description: "failed to load chats",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [isFetchAgain]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles["myChats-div-container"]}>
      <div className={styles["myChats-div-heading"]}>Chats</div>
      <Box className={styles["myChats-div-listContainer"]}>
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => {
              const sender = getSender(user, chat?.users);
              return (
                <Box
                  className={styles["myChats-box-listing"]}
                  key={chat._id}
                  onClick={() => handleBoxClick(chat)}
                  bg={
                    selectedChat === chat
                      ? "var(--lightAccent)"
                      : "var(--white)"
                  }
                  border={
                    user.notifications.includes(sender)
                      ? "4px double var(--glow)"
                      : "none"
                  }
                >
                  <Text>{getSender(user, chat.users)}</Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </div>
  );
};

export default MyChats;
