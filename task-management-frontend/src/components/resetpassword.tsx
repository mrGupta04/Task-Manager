import React, { useState } from "react";
import { sendOtp, verifyOtp, resetPassword } from "../services/authservice";
import "../styles/resetpassword.css";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSendOtp = async () => {
        try {
            await sendOtp(email);
            alert("OTP sent to your email");
            setStep(2);
        } catch (error: any) {
            alert(error.response?.data?.message || "Error sending OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await verifyOtp(email, otp);
            alert("OTP Verified");
            setStep(3);
        } catch (error: any) {
            alert(error.response?.data?.message || "Invalid OTP");
        }
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(email, newPassword);
            alert("Password Reset Successful");
            setStep(1);
            navigate("/profile");
        } catch (error: any) {
            alert(error.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="reset-container">
            {step === 1 && (
                <div>
                    <h2>Enter your email</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <button onClick={handleSendOtp}>Send OTP</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Enter OTP</h2>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <h2>Set New Password</h2>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
