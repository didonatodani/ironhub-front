import React from "react";
import "./ProfileCard.css";
import PostCard from "../PostCard/PostCard";

function ProfileCard({ user }) {
  if (!user) {
    return <p>Loading...</p>; // Render a loading message if user is null
  }
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB");
  const posts = user.posts
  console.log("this is the title of the post", posts);

  return (
    <>
      <div className="user-info">
        <div className="heading-profile">
          <img src={user.picture} alt="user-profile-image" />
          <p>
            <b> {user?.name}</b>
          </p>
          <small>User since: {formattedDate}</small>
        </div>
        <div className="profile-info">
          <h3>Bio:</h3>
          <p>
            Name:
            <b> {user?.name}</b>
          </p>
          <p>
            Email:
            <b> {user.email} </b>
          </p>
          <p>
            Course:
            <b> {user.course}</b>
          </p>
          <p>
            Course-type:
            <b> {user.schedule}</b>
          </p>
          <p> Languages:
            <b>{user.language}</b>
          </p>
        </div>
      </div>
      <div className="user-posts">
        <h2>posts: </h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
}

export default ProfileCard;
