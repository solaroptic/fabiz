import axios from "../../config/axios";
const API_BASE_URL = "/users";
const sendProfilePic = async (data) => {
  console.log("furry chinchillla");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/duysbh0j0/image/upload",
    {
      method: "post",
      body: data,
    }
  ).then((res) => res.json());
  console.log(response.secure_url);
  return response.secure_url;
};
const saveProfilePic = async (picURL, id, token) => {
  const createProfileConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_BASE_URL + `/avatar/${id}`,
    {
      picturePath: picURL,
    },
    createProfileConfig
  );
  return response.data;
};
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
const sendProfile = async (text, id, token) => {
  const createProfileConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    API_BASE_URL + `/update/${id}`,
    text,
    createProfileConfig
  );
  return response.data;
};

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
const profileServices = {
  sendProfilePic,
  sendProfile,
  saveProfilePic,
};
export default profileServices;
