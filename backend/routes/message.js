import express from "express";
import { allMessages, sendMessage } from "../controllers/message.js";
// import { getUser, updateUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Get */
router.get("/:chatId", allMessages);
/* Post */
router.post("/", verifyToken, sendMessage);

export default router;
