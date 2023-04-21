import { addMessage, getAllMessages } from "../controllers/message.js";
import express from "express";

const router = express.Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessages);

export default router;
