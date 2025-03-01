import express from "express";
import { authenticate } from '../middleware/authMiddleware';
import { register, login, updateprofile, sendOtp, verifyOtp, resetPassword } from "../controllers/authController";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.put("/update", updateprofile);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
