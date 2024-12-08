import { useState, useContext } from "react";
import axios from "axios";
import "./GeneralFormStyles.css";
import { AuthContext } from "../../context/auth.context";
const API_URL = import.meta.env.VITE_API_URL;

function PostReplyForm({ postId, setDetailPost, setShowReplyForm }) {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReply = {
      name: user._id,
      description,
      link,
      picture,
    };

    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/reply/`,
        newReply,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      // Add the newly created reply to the post's replies in state
      setDetailPost((prevPost) => ({
        ...prevPost,
        replies: [...prevPost.replies, response.data.reply],
      }));
      setShowReplyForm(false)
    } catch (error) {
      console.error("Error creating reply:", error.response.data);
    }
  };
  const handleCancel = () => setShowReplyForm(false);
  return (
    <section className="post-form-section">
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-div description">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-div link">
          <label htmlFor="link">Link (optional):</label>
          <input
            type="url"
            name="link"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="form-div picture">
          <label htmlFor="picture">Image (optional):</label>
          <input
            type="url"
            name="picture"
            id="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </section>
  );
}

export default PostReplyForm;
