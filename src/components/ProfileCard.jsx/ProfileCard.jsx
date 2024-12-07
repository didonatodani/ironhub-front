import React from "react";
import "./ProfileCard.css";


function ProfileCard({ user }) {
  if (!user) {
    return <p>Loading...</p>; // Render a loading message if user is null
  }
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB");

  // do we need this??
  const posts = user.posts;
  // console.log("this are the user posts" , posts);



  return (
    <>
      <div className="user-info">
        <div className="heading-profile">
          <p>{user?.name}</p>
          <img src={user.picture} alt="user-profile-image" />
          <span> {user.course}</span>
          <small>User since: {formattedDate}</small>
        </div>
        <div className="profile-details">
          <p>
            Name:
            <br></br>
            <span>{user?.name}</span>
          </p>
          <p>
            Email: <br></br> <span>{user.email}</span>{" "}
          </p>
          <p>
            Course-type: <br></br> <span>{user.schedule}</span>{" "}
          </p>
          <p>
            Languages: <br></br>
            <span>{user.language}</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
