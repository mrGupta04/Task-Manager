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

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, mobile_number, profile_pic, password } = user;

        if (!username || !email || !mobile_number || !profile_pic || !password) {
            alert("All fields are required!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("mobile_number", mobile_number);
            formData.append("password", password);

            if (profile_pic) {
                formData.append("profile_pic", profile_pic);
            }

            const response = await registerUser(formData);

            if (response?.success) {
                // Store user data in local storage
                const userData = {
                    username: response.data?.username || "",
                    email: response.data?.email || "",
                    mobile_number: response.data?.mobile_number || "",
                    profile_pic_url: response.data?.profile_pic_url || "",
                };
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", response?.token || "");

                console.log("Signup response:", response);

                alert(response?.message || "Registration successful!");
                navigate("/profile");
            } else {
                alert(response?.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Create a New Account</h2>
            <p className="register-subtext">
                Already have an account?{" "}
                <button className="register-link" type="button" onClick={() => navigate("/profile")}>
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
                    placeholder="Mobile Number"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="register-file-input"
                    required
                />
                {/* Profile preview - Add this right after file input */}
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
                    placeholder="Password"
                    required
                />
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
};

export default Signup;