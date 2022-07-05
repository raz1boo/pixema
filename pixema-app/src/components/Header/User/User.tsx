import React from "react";
import "./User.css";

interface UserProps {
  username: string;
  initials: string;
}

const User = ({ username, initials }: UserProps) => {
  return (
    <section className="about-user">
      <div className="initials center font-size-20px">
        <h2>{initials}</h2>
      </div>

      <div className="username center font-size-16px">
        <h3>{username}</h3>
      </div>
    </section>
  );
};

export default User;
