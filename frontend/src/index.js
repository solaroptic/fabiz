import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import chatReducer from "./redux/chat/chatMessageSlice";
import authReducer from "./redux/userAuth/userAuthSlice";
import profileReducer from "./redux/profile/profileSlice";
import userReducer from "./redux/user/userSlice";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "@reduxjs/toolkit";
import { ChakraProvider } from "@chakra-ui/react";
import thunk from "redux-thunk";
// import ChatProvider from "state/ChatProvider";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    MsgChats: chatReducer,
    profile: profileReducer,
    user: userReducer,
  },
  middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    {/* </React.StrictMode> */}
  </ChakraProvider>
);
