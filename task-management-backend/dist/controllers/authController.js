"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.sendOtp = exports.updateprofile = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jwtUtils_1 = require("../utils/jwtUtils");
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.register = [
    uploadMiddleware_1.default.single('profile_pic'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password, mobile_number } = req.body;
            const profile_pic = req.file ? req.file.filename : null;
            // Validate input
            if (!username || !email || !password || !mobile_number) {
                res.status(400).json({ success: false, message: 'All fields are required.' });
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                res.status(400).json({ success: false, message: 'Invalid email format.' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
                return;
            }
            // Check if user already exists
            const existingUser = yield user_1.default.findOne({ where: { email } });
            if (existingUser) {
                res.status(409).json({ success: false, message: 'Email is already registered.' });
                return;
            }
            // Hash password and create user
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const newUser = yield user_1.default.create({
                username,
                email,
                mobile_number,
                profile_pic,
                password_hash: hashedPassword,
            });
            // Generate token
            const token = (0, jwtUtils_1.generateToken)({ userId: newUser.id });
            // Send response
            res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    mobile_number: newUser.mobile_number,
                    profile_pic: newUser.profile_pic,
                    token,
                },
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            next(error);
        }
    }),
];
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required.' });
            return;
        }
        // Find user by email
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password_hash))) {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
            return;
        }
        // Generate token
        const token = (0, jwtUtils_1.generateToken)({ userId: user.id });
        // Send response
        res.json({
            success: true,
            message: 'Login successful.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                mobile_number: user.mobile_number,
                profile_pic: user.profile_pic,
                token,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        next(error);
    }
});
exports.login = login;
exports.updateprofile = [
    uploadMiddleware_1.default.single("profile_pic"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, mobile_number } = req.body;
            if (!email) {
                res.status(400).json({ success: false, message: "Email is required." });
                return;
            }
            // Find user by email
            const user = yield user_1.default.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ success: false, message: "User not found." });
                return;
            }
            // Update user details
            const profile_pic = req.file ? req.file.filename : user.profile_pic;
            // Update only fields that are provided
            yield user.update({
                username: username || user.username,
                mobile_number: mobile_number || user.mobile_number,
                profile_pic,
            });
            // Send response with updated user data
            res.status(200).json({
                success: true,
                message: "User updated successfully.",
                user: {
                    id: user.id,
                    username: username || user.username,
                    email: user.email,
                    mobile_number: mobile_number || user.mobile_number,
                    profile_pic,
                },
            });
        }
        catch (error) {
            console.error("Update error:", error);
            next(error);
        }
    }),
];
const otpStorage = new Map();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Find user by email
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found.' });
            return;
        }
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        // Store OTP
        otpStorage.set(email, { otp, expiresAt });
        // Send OTP via email
        yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code for Password Reset',
            text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
        });
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        // Validate input
        if (!email || !otp) {
            res.status(400).json({ message: 'Email and OTP are required' });
            return;
        }
        // Check if OTP exists and is valid
        const storedOtp = otpStorage.get(email);
        if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
            res.status(400).json({ message: 'Invalid or expired OTP' });
            return;
        }
        // Remove OTP after verification
        otpStorage.delete(email);
        res.status(200).json({ message: 'OTP verified successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyOtp = verifyOtp;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        // Validate input
        if (!email || !newPassword) {
            res.status(400).json({ message: 'Email and new password are required' });
            return;
        }
        // Find user by email
        const user = yield user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Hash new password
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        // Update password
        yield user.update({ password_hash: hashedPassword });
        // Generate token
        const token = (0, jwtUtils_1.generateToken)({ userId: user.id });
        // Send response
        res.status(200).json({
            success: true,
            message: 'Password reset successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                mobile_number: user.mobile_number,
                profile_pic: user.profile_pic,
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
