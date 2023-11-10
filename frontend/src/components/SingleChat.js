import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesFromDb, sendMessage } from "../redux/chat/chatMessageSlice";
import ProfilePic from "./ProfilePic";
import ScrollableChat from "./ScrollableChat";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Box, FormControl } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import styles from "../components-css/SingleChatCSS.module.css";

const ENDPOINT = "https://fabian-project1.onrender.com";
const SingleChat = ({ isFetchAgain, setIsFetchAgain }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user, token, selectedChat } = useSelector((state) => state.auth);
  const { allMessages, isLoading, isError } = useSelector(
    (state) => state.MsgChats
  );
  const { chats } = useSelector((state) => state.MsgChats);
  let selectedChatCompare = allMessages[0]?.chat;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const initConnection = () => {
      socketRef.current = io(ENDPOINT);
      socketRef.current.on("typing", () => setIsTyping(true));
      socketRef.current.on("stop typing", () => setIsTyping(false));
    };

    initConnection();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("setup", user);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/login");
      } else if (user) {
        await dispatch(messagesFromDb());
        socketRef.current.emit("join chat", selectedChat?._id);
      }
    })();
    // if (isError) {
    //   toast.error("Failed to get messages");
    // }
  }, [user, selectedChat, chats, token, isError, navigate, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    (async () => {
      if (newMessage) {
        try {
          const { payload } = await dispatch(sendMessage(newMessage));
          socketRef.current.emit("new message", payload);
          setNewMessage("");
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [newMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  const typingHandler = (e) => {
    setMessageInput(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socketRef.current.emit("typing", selectedChat?._id);
    }

    let socketTimeout = null; // Declare socketTimeout here
    clearTimeout(socketTimeout); // Clear any previous timeouts
    socketTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  useEffect(() => {
    socketRef.current.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
      } else {
        dispatch({
          type: "chatMsgs/updateMessages",
          payload: [...allMessages, newMessageReceived],
        });
      }
    });
  });
  const handleMessageSend = (e) => {
    if ((e.key === "Enter" || e.target.type === "submit") && messageInput) {
      socketRef.current.emit("stop typing", selectedChat?._id);
      setNewMessage(messageInput);
      setMessageInput("");
    }
  };

  const getSender = (users) => {
    return users?.find((u) => u?._id !== user?._id).userName;
  };

  const getSenderPic = (users) => {
    return users?.find((u) => u?._id !== user?._id).picturePath;
  };
  return (
    <>
      {selectedChat ? (
        <div className={styles["singleChat-container"]}>
          <div className={styles["singleChat-heading"]}>
            {!selectedChat?.isGroupChat ? (
              <span className={styles["singleChat-heading-span"]}>
                {getSender(selectedChat?.users)}
                <ProfilePic src={getSenderPic(selectedChat?.users)} />
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: "blue",
                }}
              >
                {selectedChat.chatName.toUpperCase()}
              </span>
            )}
          </div>
          <main className={styles["singleChat-main-chatWindow"]}>
            {isLoading ? (
              <ChatLoading />
            ) : (
              <span className={styles.messages}>
                {/* Add a unique key to the container div or elements inside it */}
                <ScrollableChat
                  messages={allMessages}
                  style={{ maxHeight: "300px" }}
                />
              </span>
            )}
            {isTyping ? (
              <span className={styles["span-typing"]}>Typing...</span>
            ) : (
              <></>
            )}
            <FormControl onKeyDown={handleMessageSend} isRequired mt={3}>
              <input
                className={styles["singleChat-input"]}
                placeholder="Type your message..."
                onChange={typingHandler}
                value={messageInput}
              />
              <button
                type="submit"
                onClick={handleMessageSend}
                className={styles["singleChat-button"]}
              >
                Send
              </button>
            </FormControl>
          </main>
        </div>
      ) : (
        <Box className={styles["singleChat-box-alt"]}>
          {chats.length > 0 && <p>Click on a member to start chat</p>}
          {chats.length < 1 && <p>Find a member in The List</p>}
        </Box>
      )}
    </>
  );
};

export default SingleChat;
