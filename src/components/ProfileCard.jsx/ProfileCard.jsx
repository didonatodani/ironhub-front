import React from "react";
import "./ProfileCard.css";
import EditProfileForm from "../Forms/EditProfileForm";


function ProfileCard({ user }) {
  if (!user) {
    return <p>Loading...</p>; // Render a loading message if user is null
  }
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB");

  // const [showEditProfileForm, setShowEditProfile] = useState(false);


  return (
    <>
      <div className="user-info">
        <div className="heading-profile">
          <h2>{user?.name}</h2>
          <img src={user.picture} alt="user-profile-image" />
          <span> {user.course}</span>
          <small>User since: {formattedDate}</small>
        </div>
        <div className="profile-details">
          <button className="primary-button">Edit Profile</button>
          <p>
            Name:
            <span>{user?.name}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            Course-type: <span>{user.schedule}</span>
          </p>
          <p>
            Languages:
            <span>{user?.language}</span>
          </p>
        </div>
      </div>
      : (
      <EditProfileForm
        id={_id}
        storedToken={storedToken}
        user={user}
        setShowEditProfile={setShowEditProfile}
      />
      )
    </>
  );
}

export default ProfileCard;
