import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "./userServices";
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

export const logintoDb = createAsyncThunk(
  "user/sendLogin",
  async (data, thunkAPI) => {
    try {
      return await userServices.sendLoginInfo(data);
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

export const registerToDb = createAsyncThunk(
  "user/registerInfo",
  async (formData, thunkAPI) => {
    try {
      return await userServices.sendRegisterInfo({
        formData,
      });
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

export const updatedNotificationsToDb = createAsyncThunk(
  "user/sendNotifications",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const id = thunkAPI.getState().auth.user._id;
      // const selectedChat = thunkAPI.getState().auth.selectedChat;

      const response = await userServices.sendUpdatedNotifications(
        text,
        id,
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
export const membersListFromDb = createAsyncThunk(
  "cats/members",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userServices.getMembers(token);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isLoading: false,
      isError: false,
      isSuccess: false,
      token: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(logintoDb.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logintoDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(logintoDb.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload,
      }))
      .addCase(registerToDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registerToDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(registerToDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase(updatedNotificationsToDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(updatedNotificationsToDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(updatedNotificationsToDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase(membersListFromDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(membersListFromDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(membersListFromDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }));
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
