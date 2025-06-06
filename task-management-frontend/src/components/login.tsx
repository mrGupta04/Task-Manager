import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import "../styles/login.css";

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(user);
      console.log("Login response:", response);

      if (response.success) {
        const { token, user: userData } = response;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        window.location.reload();

        onLogin(userData);
        navigate("/profile");
      } else {
        setError(response.message || "Invalid email or password.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-login-container">
      <h2 className="auth-login-title">Login to Your Account</h2>
      {error && <p className="auth-error-message">{error}</p>}

      <form className="auth-login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="auth-input-group">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="auth-input-field"
            placeholder="Your email"
            required
          />
        </div>

        <div className="auth-input-group">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="auth-input-field"
            placeholder="Your password"
            required
          />
        </div>

        <div className="auth-forgot-password">
          <button
            type="button"
            className="auth-forgot-password-link"
            onClick={() => navigate("/resetpassword")}
          >
            Forgot Your Password?
          </button>
        </div>

        <button type="submit" className="auth-login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="auth-register-link">
        <button
          type="button"
          className="auth-register-link-btn"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;