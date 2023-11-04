import express from "express";
import {
  getUser,
  updateNotifications,
  updateUser,
  updateUserPicture,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/avatar/:id", verifyToken, updateUserPicture);
router.patch("/update/:id", verifyToken, updateUser);
router.patch("/notifications/:id", verifyToken, updateNotifications);
// router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
