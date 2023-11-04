import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Facts from "./components/Facts";
import Story from "./components/Story";
import Geneology from "./components/Geneology";
import Profile from "./pages/Profile";
import MembersList from "./pages/MembersList";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
// import MemberProfile from "./pages/MemberProfile";
import ProfileEdit from "pages/ProfileEdit";
// import { useSelector } from "react-redux";

const App = () => {
  // const get = async () => {
  //   const res = await fetch("http://localhost:8000");
  //   console.log(res);
  // };
  // get();
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/story" element={<Story />} />
        <Route path="/geneology" element={<Geneology />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/list" element={<MembersList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
};

export default App;
