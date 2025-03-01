import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (user: FormData) => {
  try {
    for (const [key, value] of user) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(`${API_URL}/register`, user, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // Returns the full response from the server
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Signup failed. Please try again.");
  }
};

// Login User
export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);

    console.log("Login response:", response.data); // Debugging

    return response.data; // Return full response, including user details and token
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed. Please check your credentials.");
  }
};

export const updateUser = async (user: FormData) => {
  for (const [key, value] of user) {
    console.log(`${key}:`, value);
  }

  try {

    const response = await axios.post(`${API_URL}/update`, user, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    console.error("Update error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Failed to update profile" };
  }
};


export const sendOtp = async (email: string) => {
    return axios.post(`${API_URL}/send-otp`, { email });
};

/**
 * Verifies the OTP entered by the user
 */
export const verifyOtp = async (email: string, otp: string) => {
    return axios.post(`${API_URL}/verify-otp`, { email, otp });
};

/**
 * Resets the user's password
 */
export const resetPassword = async (email: string, newPassword: string) => {
    return axios.post(`${API_URL}/reset-password`, { email, newPassword });
};
