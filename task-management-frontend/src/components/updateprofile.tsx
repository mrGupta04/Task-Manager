import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../services/authservice";
import "../styles/updateprofile.css";

interface User {
  username: string;
  email: string;
  mobile_number: string;
  profile_pic: string;
}

interface UpdateProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onClose: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ user, onUpdate, onClose }) => {
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState<User>({ ...user });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user.profile_pic);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", updatedUser.email);
      formData.append("username", updatedUser.username);
      formData.append("mobile_number", updatedUser.mobile_number);
      if (profilePicFile) {
        formData.append("profile_pic", profilePicFile);
      }

      // Log formData entries to verify
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await updateUser(formData);
      if (response.success) {
        const updatedUserData: User = {
          ...updatedUser,
          profile_pic: response.user.profile_pic || updatedUser.profile_pic,
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        onUpdate(updatedUserData);
        onClose();
        navigate("/profile");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="update-form-container">
      <h2>Update Profile</h2>
      {error && <p className="up-error-message">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="up-profile-pic-preview">
          <img src={previewImage} alt="Profile" className="up-profile-pic" />
        </div>
        <label htmlFor="profile-pic" className="up-file-label">
          Choose Profile Picture
        </label>
        <input
          type="file"
          id="profile-pic"
          accept="image/*"
          onChange={handleFileChange}
          className="up-file-input"
        />
        <input
          type="text"
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
          className="up-text-input"
          placeholder="Username"
          required
        />
        <input
          type="tel"
          name="mobile_number"
          value={updatedUser.mobile_number}
          onChange={handleChange}
          className="up-text-input"
          placeholder="Mobile Number"
          required
        />
        <div className="up-button-container">
          <button type="submit" className="up-save-button">
            Save
          </button>
          <button type="button" onClick={onClose} className="up-cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
