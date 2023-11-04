// import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import styles from "../components-css/SingleChatCSS.module.css";

const ScrollableChat = ({ messages }) => {
  const user = useSelector((state) => state.auth.user);
  // text/setting mods///////////////////////////
  const flip = (str) => {
    const words = str.split(" ");
    const reversedWords = words.slice(1).concat([" - ", words[0]]);
    const reversedString = reversedWords.join(" ");
    return reversedString;
  };

  const senderMargin = (messages, m, i, userId) => {
    if (
      i < messages?.length - 1 &&
      // messages[i + 1]?.sender?._id === m.sender?._id &&
      messages[i]?.sender?._id !== userId
    )
      return 10;
    else if (
      (i < messages?.length - 1 &&
        messages[i + 1]?.sender?._id !== m.sender?._id &&
        messages[i]?.sender?._id !== userId) ||
      (i === messages.length - 1 && messages[i]?.sender?._id !== userId)
    )
      return 0;
    else return "auto";
  };

  const isSameUserBool = (messages, m, i) => {
    return i > 0 && messages[i - 1]?.sender?._id === m.sender?._id;
  };

  //END text/setting mods END///////////////////////////
  return (
    <ScrollableFeed>
      {messages &&
        messages?.map((m, i) => (
          <div style={{ display: "flex" }} key={i}>
            <span
              className={styles["scrollChat-span-bubble"]}
              style={{
                backgroundColor: `${
                  m.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: senderMargin(messages, m, i, user._id),
                marginTop: isSameUserBool(messages, m, i, user._id)
                  ? "0.8rem"
                  : "1.4rem",
              }}
            >
              {m.content}
              <section
                style={{ fontSize: "1.05rem", fontFamily: "times-new-roman" }}
              >
                {flip(
                  new Date(m.createdAt).toLocaleString().replace(/(.{5}),/, "")
                ).toLowerCase()}
              </section>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

// const isSameSender = (messages, m, i, userId) => {
//   console.log(messages, "🛒🛒🛒", m);
//   return (
//     i < messages?.length - 1 &&
//     (messages[i + 1]?.sender?._id !== m.sender?._id ||
//       messages[i + 1]?.sender?._id === undefined) &&
//     messages[i]?.sender?._id !== userId
//   );
// };
// const isLastMessage = (messages, i, userId) => {
//   return (
//     i === messages?.length - 1 &&
//     messages[messages.length - 1]?.sender?._id !== userId &&
//     messages[messages.length - 1]?.sender?._id
//   );
// };

/* {(isSameSender(messages, m, i, user._id) ||
      isLastMessage(messages, i, user._id)) && (
      <Tooltip
      label={m.sender?.userName}
      placement="bottom-start"
      hasArrow
      >
      <Avatar
      mt="7px"
      mr={5}
          size="md"
          cursor="pointer"
          name={m.sender?.userName}
          src={m.sender?.picturePath}
          />
          </Tooltip>
        )} */
