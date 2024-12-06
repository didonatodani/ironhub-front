import { useState } from "react";
import axios from "axios";
import "./GeneralFormStyles.css";

function ReplyForm({ reply, isEditing, setIsEditing, setDetailPost }) {
  
  const [description, setDescription] = useState(reply.description);
  const [link, setLink] = useState(reply.link);
  const [picture, setPicture] = useState(reply.picture);

  const storedToken = localStorage.getItem("authToken");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedReply = {
      description,
      link,
      picture,
    };

    try {
      const response = await axios.put(
        `${API_URL}/posts/${reply.postId}/reply/${reply._id}`,
        editedReply,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      // Update the reply in the parent component's state
      setDetailPost((prevPost) => {
        const updatedReplies = prevPost.replies.map((post) =>
          post._id === reply._id ? response.data : post
        );
        return { ...prevPost, replies: updatedReplies };
      });

      // After updating the reply, stop editing
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  const handleCancel = () => setIsEditing(false); // Close the form without saving

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
        <button type="submit" className="submit-btn">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </section>
  );
}


export default ReplyForm;
