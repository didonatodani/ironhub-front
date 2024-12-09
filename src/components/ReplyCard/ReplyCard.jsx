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
  const { postId } = useParams();
  const formattedDate = new Date(created).toLocaleDateString("en-GB");
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => setIsEditing(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/reply/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

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
        <img src={picture} alt="picture" />
        <p>
          Link:{" "}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          )}
        </p>
        <div className="reply-btns">
          {name._id === user._id && (
            <>
              {!isEditing && <button onClick={handleEditing} className="primary-button">Edit</button>}
              {isEditing && (
                <ReplyForm
                  reply={reply}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setDetailPost={setDetailPost}
                />
              )}
              <button
                onClick={handleDelete}
                className="secondary-button danger-button"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default ReplyCard;
