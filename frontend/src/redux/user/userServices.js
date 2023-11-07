import axios from "../../config/axios";
const API_BASE_URL_A = "/auth";
const API_BASE_URL_B = "/users";
const API_BASE_URL_C = "/members";

const sendLoginInfo = async (text) => {
  console.log("🎲 service");
  const response = await axios.post(API_BASE_URL_A + "/login", text);
  return response.data;
};
const sendRegisterInfo = async (formData) => {
  const response = await axios.post(API_BASE_URL_A + "/register", formData);
  return response.data;
};

const sendUpdatedNotifications = async (text, id, token) => {
  const createProfileConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_BASE_URL_B + `/notifications/${id}`,
    text,
    createProfileConfig
  );
  console.log(response.data);
  return response.data;
};

const getMembers = async (token) => {
  const createProfileConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_BASE_URL_C, createProfileConfig);
  // await console.log("👓👓👓service part of get members", response);
  return response;
};

const userServices = {
  sendLoginInfo,
  sendRegisterInfo,
  sendUpdatedNotifications,
  getMembers,
};
export default userServices;
