import { getAllUsers, login, register } from "../controllers/users.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);

export default router;
