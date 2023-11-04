import express from "express";
import { getAllUsers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ ALL */
router.get("/", verifyToken, getAllUsers);
// router.get("/search", verifyToken, searchAllUsers);

export default router;
