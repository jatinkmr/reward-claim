import React from "react";
import "./userHeader.css";

const UserHeaderComponent = ({ customerName }) => {
  return (
    <div className="welcome-back-header">
      <div className="profile-section">
        <div className="profile-image-container">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="welcome-text">
          <div className="welcome-back">Welcome Back</div>
          <div className="user-name">{customerName}</div>
        </div>
      </div>
    </div>
  );
};

export default UserHeaderComponent;
