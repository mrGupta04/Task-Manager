import React, { useState } from "react";
import UpdateProfile from "./updateprofile";

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

const Profilecard: React.FC<ProfilecardProps> = ({ user, onLogout }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(user);

 
  const handleUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="profile-container">
      {isUpdating ? (
        <UpdateProfile 
          user={currentUser} 
          onUpdate={handleUpdate} 
          onClose={() => setIsUpdating(false)} 
        />
      ) : (
        <>
          <img src={currentUser.profile_pic} alt="Profilecard" className="profile-pic" />
          <h1>Welcome, {currentUser.username}!</h1>
          <p>Mobile Number: {currentUser.mobile_number}</p>
          <p>Email: {currentUser.email}</p>
          <div className="button-container">
            <button onClick={onLogout} className="logout-button">Logout</button>
            <button onClick={() => setIsUpdating(true)} className="update-button">Update</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profilecard;
