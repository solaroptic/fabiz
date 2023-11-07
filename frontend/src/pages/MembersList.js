import React, { useEffect } from "react";
import Member from "../components/Member";
import { setMembers } from "redux/userAuth/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "components/BackIcon";
import NavBar from "components/NavBar";
import { membersListFromDb } from "redux/user/userSlice";
import styles from "../pages-css/List.module.css";

const MembersList = () => {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.auth);

  const getMembers = async () => {
    try {
      const response = await dispatch(membersListFromDb());
      const membersReturned = response.payload.data;
      dispatch(setMembers(membersReturned));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles["list-container"]}>
      <NavBar />
      <BackIcon />
      <h1>Members</h1>
      {members && (
        <ul>
          {members?.map((member) => (
            <Member
              member={member}
              profilePictureUrl={member.picturePath}
              name={member.userName}
              location={member.location}
              key={member._id}
              id={member._id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MembersList;
