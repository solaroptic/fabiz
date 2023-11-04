import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "./profileServices";
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

export const sendImageToCloud = createAsyncThunk(
  "profile/sendImage",
  async (data, thunkAPI) => {
    console.log("🚀 ~ file:  profileSlice.js:13 ~ data:");
    try {
      const imageUrl = await profileServices.sendProfilePic(data);
      return imageUrl;
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

export const sendPicToDb = createAsyncThunk(
  "profile/saveImage",
  async (data, thunkAPI) => {
    console.log("🚀 ~ file: profileSlice.js:34 ~ data:");
    try {
      const token = thunkAPI.getState().auth.token;
      const id = thunkAPI.getState().auth.user._id;

      const response = await profileServices.saveProfilePic(data, id, token);
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

export const sendUserInfoToDb = createAsyncThunk(
  "profile/sendProfile",
  async (text, thunkAPI) => {
    console.log("🚀 ~ file: profileSlice.js:59 ~ data:");
    try {
      const token = thunkAPI.getState().auth.token;
      const id = thunkAPI.getState().auth.user._id;

      const response = await profileServices.sendProfile(text, id, token);
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

const profileSlice = createSlice({
  name: "profile",
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
      .addCase(sendImageToCloud.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(sendImageToCloud.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(sendImageToCloud.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload,
      }))
      .addCase(sendPicToDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(sendPicToDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(sendPicToDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }))
      .addCase(sendUserInfoToDb.pending, (state, action) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(sendUserInfoToDb.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
      }))
      .addCase(sendUserInfoToDb.rejected, (state, action) => ({
        ...state,
        isError: true,
        isLoading: false,
        isSuccess: false,
        errorMessage: action.payload,
      }));
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
