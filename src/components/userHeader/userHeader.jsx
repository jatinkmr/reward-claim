import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./userHeader.css";

const UserHeaderComponent = ({ customerName }) => {
  return (
    <div className="welcome-back-header">
      <Container fluid>
        <div className="profile-section">
          <Col xs="auto">
            <div className="profile-image-container">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                alt="Profile"
                className="profile-image"
              />
            </div>
          </Col>
          <Col>
            <div className="welcome-text">
              <div className="welcome-back">Welcome Back</div>
              <div className="user-name">{customerName}</div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default UserHeaderComponent;
