import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authservice";
import "../styles/signup.css";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        mobile_number: "",
        profile_pic: null as File | null,
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUser((prevUser) => ({
                ...prevUser,
                profile_pic: files[0],
            }));
        }
    };

    const validateForm = () => {
        const { username, email, mobile_number, profile_pic, password } = user;

        if (!username || !email || !mobile_number || !profile_pic || !password) {
            alert("All fields are required!");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }

        if (!/^\d{10}$/.test(mobile_number)) {
            alert("Please enter a valid 10-digit mobile number");
            return false;
        }

        return true;
    };

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("mobile_number", user.mobile_number);
            formData.append("password", user.password);

            if (user.profile_pic) {
                formData.append("profile_pic", user.profile_pic);
            }

            const response = await registerUser(formData);
            
            if (response?.success) {
                const userData = {
                    id: response.user.id,
                    username: response.user.username,
                    email: response.user.email,
                    mobile_number: response.user.mobile_number,
                    profile_pic: response.user.profile_pic,
                };

                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", response.token);

                alert("Registration successful!");
                navigate("/profile");  // Redirect to profile page
            } else {
                alert(response?.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Email or mobile number is already registered");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Create a New Account</h2>
            <p className="register-subtext">
                Already have an account?{" "}
                <button className="register-link" type="button" onClick={() => navigate("/login")}>
                    Login
                </button>
            </p>
            
            <form className="register-form" onSubmit={register}>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="register-input"
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="register-input"
                    placeholder="Email"
                    required
                />
                <input
                    type="tel"
                    name="mobile_number"
                    value={user.mobile_number}
                    onChange={handleChange}
                    className="register-input"
                    placeholder="Mobile Number (10 digits)"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="register-file-input"
                    required
                />
                
                {user.profile_pic && (
                    <img
                        src={URL.createObjectURL(user.profile_pic)}
                        alt="Profile Preview"
                        className="profile-preview"
                    />
                )}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="register-input"
                    placeholder="Password (min 6 characters)"
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Signup;