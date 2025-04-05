import React, { useState } from "react";
import UpdateProfile from "./updateprofile";
import "../styles/profile.css";

interface User {
  username: string;
  email: string;
  mobile_number: string;
  profile_pic: string;
}

interface ProfilecardProps {
  user: User;
  onLogout: () => void;
}

const backendUrl = "https://task-manager-cjw8.onrender.com"; // Replace with your backend URL

const Profilecard: React.FC<ProfilecardProps> = ({ user, onLogout }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const handleUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const profilePicUrl = currentUser.profile_pic
    ? `${backendUrl}/uploads/${currentUser.profile_pic}`
    : "https://via.placeholder.com/150";

  return (
    <div className="pc-container">
      {isUpdating ? (
        <UpdateProfile
          user={currentUser}
          onUpdate={handleUpdate}
          onClose={() => setIsUpdating(false)}
        />
      ) : (
        <>
          <div className="pc-profile-pic-container">
            <img
              src={profilePicUrl}
              alt="Profile"
              className="pc-profile-pic"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
              }}
            />
          </div>
          <h1 className="pc-welcome-heading">Welcome, {currentUser.username}!</h1>
          <div className="pc-details">
            <p className="pc-detail-text">
              <strong>Mobile Number:</strong> {currentUser.mobile_number}
            </p>
            <p className="pc-detail-text">
              <strong>Email:</strong> {currentUser.email}
            </p>
          </div>

          <div className="pc-btn-container">
            <button onClick={onLogout} className="pc-btn pc-btn--logout">
              <svg aria-hidden="true" className="pc-btn-icon" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14 8V6c0-2.21-1.79-4-4-4H4c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-2h-2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2h2zm7 3l-5 5l-5-5h3V9h4v2h3z"
                />
              </svg>
              Logout
            </button>

            <button onClick={() => setIsUpdating(true)} className="pc-btn pc-btn--update">
              <svg aria-hidden="true" className="pc-btn-icon" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"
                />
              </svg>
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profilecard;
