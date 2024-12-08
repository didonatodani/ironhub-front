import "./ReplyCard.css";
import { AuthContext } from "../../context/auth.context";
import { useState, useContext } from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import ReplyForm from "../Forms/ReplyForm.jsx";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useParams } from "react-router-dom";

function ReplyCard({ reply, setDetailPost }) {
  const { _id, created, description, link, name, picture } = reply;
  const {postId} = useParams();
  const formattedDate = new Date(created).toLocaleDateString("en-GB");
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [isEditing, setIsEditing] = useState(false);

  console.log("Rendering reply:", reply);
  const handleEditing = () => {
    console.log("Reply before editing:", reply); // Log before updating

    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/reply/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      // Optionally update the parent state to remove the reply
      setDetailPost((prevPost) => ({
        ...prevPost,
        replies: prevPost.replies.filter((eachPost) => eachPost._id !== _id),
      }));
    } catch (error) {
      console.log("Error deleting reply: ", error);
    }
  };
  

  return (
    <>
      <article className="reply-container">
        <div>
          <hr />
          <div className="reply-header">
            <p>{name?.name}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
        <p>{description}</p>
        <p>Image: {picture}</p>
        <p>Link: {link}</p>
        <div className="reply-btns">
          {console.log("name._id:", name._id, "user._id:", user._id)}
          {name._id === user._id && (
            <>
              {!isEditing && <button onClick={handleEditing}>Edit</button>}
              {isEditing && (
                <ReplyForm
                  reply={reply}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setDetailPost={setDetailPost}
                />
              )}
              <button onClick={handleDelete} className="secondary-button danger-button">Delete</button>
              
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default ReplyCard;
