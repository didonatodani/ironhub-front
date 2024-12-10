import React from "react";
import "./ProfileCard.css";


function ProfileCard({ user, setShowEditProfile }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB");

  return (
    <div className="user-info">
      <div className="heading-profile">
        <h2>{user.name}</h2>
        <img src={user.picture} alt="user-profile" />
        <span>{user.course}</span>
        <small>User since: {formattedDate}</small>
      </div>
      <div className="profile-details">
        <button
          className="primary-button"
          onClick={() => setShowEditProfile(true)}
        >
          Edit Profile
        </button>
        <p>
          Name: <span>{user.name}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
        <p>
          Course-type: <span>{user.schedule}</span>
        </p>
        <p>
          Languages: <span>{user.languages}</span>
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
