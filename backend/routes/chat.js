import express from "express";
import {
  accessChat,
  // addToGroup,
  // clearSeenMessages,
  // createGroupChat,
  fetchChats,
  // removeFromGroup,
  // renameGroup,
} from "../controllers/chat.js";
// import { getUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Post */
router.post("/", accessChat);
// router.post("/group", createGroupChat);
// router.post("/clear/:id", clearSeenMessages);

/* Get */
router.get("/", verifyToken, fetchChats);

/* Put */
// router.put("/rename", renameGroup);
// router.put("/groupremove", removeFromGroup);
// router.put("/groupadd", addToGroup);

export default router;
