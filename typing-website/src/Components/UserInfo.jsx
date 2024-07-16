import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const UserInfo = ({ user, totalTestTaken }) => {
  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon
            style={{
              display: "block",
              transform: "scale(6)",
              margin: "auto",
              marginTop: "3.5rem",
            }}
          />
        </div>
        <div className="info">
          <div className="email">{user.email}</div>
          <div className="joined-at">
            {new Date(user.creationTime).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="total-tests">
        <span>Total Test Taken - {totalTestTaken}</span>
      </div>
    </div>
  );
};
export default UserInfo;
