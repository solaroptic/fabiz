import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatMessageService from "./chatMessageServices.js";
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  allMessages: [],
  chats: [],
};

export const sendMessage = createAsyncThunk(
  "message/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const selectedChat = thunkAPI.getState().auth.selectedChat;

      return await chatMessageService.createChatMessage(
        {
          content: data,
          chatId: selectedChat._id,
        },
        token
      );
    } catch (error) {
      const message = {
        error:
          (error.response
            ? error.response.data
            : error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const messagesFromDb = createAsyncThunk(
  "chatMessages/get",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const selectedChat = thunkAPI.getState().auth.selectedChat;

      const response = await chatMessageService.getMessages(
        selectedChat._id,
        token
      );
      return response;
    } catch (error) {
      const message = {
        error:
          (error.response
            ? error.response.data
            : error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatsFromDb = createAsyncThunk(
  "chats/receive",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await chatMessageService.getChats(token);
      return response.data;
    } catch (error) {
      const message = {
        error:
          (error.response
            ? error.response.data
            : error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatToDB = createAsyncThunk(
  "chat/initiate",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const user = thunkAPI.getState().auth.user;

      const response = await chatMessageService.postChat(userId, user, token);
      return response.data;
    } catch (error) {
      const message = {
        error:
          (error.response
            ? error.response.data
            : error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const chatSlice = createSlice({
  name: "MsgChats",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isLoading: false,
      isError: false,
      isSuccess: false,
      token: null,
      chats: null,
    }),
    setChats: (state, action) => ({
      ...state,
      chats: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(sendMessage.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allMessages: [...state.allMessages, action.payload],
      }))
      .addCase(sendMessage.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload,
      }))
      .addCase(messagesFromDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(messagesFromDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allMessages: action.payload,
      }))
      .addCase(messagesFromDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase(chatsFromDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(chatsFromDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        chats: action.payload,
      }))
      .addCase(chatsFromDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase(chatToDB.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(chatToDB.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(chatToDB.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase("chatMsgs/updateMessages", (state, action) => ({
        ...state,
        allMessages: action.payload,
      }));
  },
});

export const { reset, setChats } = chatSlice.actions;
export default chatSlice.reducer;
