import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  members: null,
  selectedChat: null,
  notifications: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => ({
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    }),
    setMembers: (state, action) => ({
      ...state,
      members: action.payload,
    }),
    setSelectedChat: (state, action) => ({
      ...state,
      selectedChat: action.payload,
    }),
    setNotifications: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        notifications: action.payload,
      },
    }),
    setPic: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        picturePath: action.payload,
      },
    }),
    setNewUser: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        userName: action.payload.userName,
        location: action.payload.location,
        about: action.payload.about,
        news: action.payload.news,
      },
    }),
    setLogout: (state) => ({
      ...state,
      user: null,
      token: null,
    }),
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setMembers,
  setSelectedChat,
  setNotifications,
  setNewUser,
  setPic,
} = authSlice.actions;
export default authSlice.reducer;
