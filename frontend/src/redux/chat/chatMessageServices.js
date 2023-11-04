import axios from "../../config/axios";
const API_BASE_URL_A = "/message";
const API_BASE_URL_B = "/chat";

const createChatMessage = async (text, token) => {
  const createChatsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_BASE_URL_A + "",
    text,
    createChatsConfig
  );
  return response.data;
};

const getMessages = async (selectedChatId, token) => {
  console.log("hi");
  const GetChatsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_BASE_URL_A}/${selectedChatId}`,
    GetChatsConfig
  );
  console.log("🎈🎈🎈🎈🎈🎈", response.data);
  return response.data;
};
const getChats = async (token) => {
  const GetChatsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_BASE_URL_B + "", GetChatsConfig);

  return response;
};
const postChat = async (userId, user, token) => {
  console.log("🎲🎲🎲postchat service");
  const createChatsConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_BASE_URL_B,
    { userId, user },
    createChatsConfig
  );
  console.log("🎲🎲🎲🎲🎲", response);
  return response;
};

const chatMessageService = {
  createChatMessage,
  getMessages,
  getChats,
  postChat,
};
export default chatMessageService;
