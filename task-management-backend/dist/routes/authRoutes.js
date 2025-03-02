"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.put("/update", authController_1.updateprofile);
router.post("/send-otp", authController_1.sendOtp);
router.post("/verify-otp", authController_1.verifyOtp);
router.post("/reset-password", authController_1.resetPassword);
exports.default = router;
