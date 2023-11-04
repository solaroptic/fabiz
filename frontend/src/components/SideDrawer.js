import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/userAuth/userAuthSlice";
import { useNavigate } from "react-router-dom";
import styles from "../components-css/SideDrawerCSS.module.css";
import MenuListing from "./MenuListing";

const SideDrawer = ({ state }) => {
  console.log("Side Drawer runs");

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const memberId = state?.other?._id || null;
  const toast = useToast();
  const { user } = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.auth.user.notifications);
  const isHighlight = notifications && notifications.length > 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    dispatch(setLogout());
  };
  const toProfile = () => {
    navigate(`/profile/:${user._id}`, { state: { profileState: user } });
  };
  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
  };

  const accessChat = async (userId) => {
    try {
      dispatch({
        type: "chat/initiate",
        payload: userId,
      });
    } catch (error) {
      toast({
        title: "Error retrieving chat!",
        status: "error",
        description: error.message,
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    if (!memberId) {
      return;
    } else {
      accessChat(memberId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={styles["sideDrawer-container"]}>
        <div className={styles["sideDrawer-dashboard"]}>
          <main>
            <button
              onClick={toggleNotes}
              className={styles["sideDrawer-bellContainer"]}
            >
              <FaBell
                className={`${styles["drawer-icon"]} ${
                  isHighlight && styles["drawer-icon-highlight"]
                }`}
              />
            </button>
            {isNotesOpen && <MenuListing />}
          </main>
          <h1>Project Fabian</h1>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              className={styles["sideDrawer-dropDown"]}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.userName}
                src={user.picturePath}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={toProfile} fontSize="var(--smallestFont)">
                My Profile
              </MenuItem>
              <MenuDivider borderColor={"var(--secondary)"} />
              <MenuItem onClick={logout} fontSize="var(--smallestFont)">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
