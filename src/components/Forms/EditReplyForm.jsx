import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";
import { useState, useContext } from "react";
import axios from "axios";
import "./GeneralFormStyles.css";

const API_URL = import.meta.env.VITE_API_URL;

function EditReplyForm({ reply, setIsEditing, setDetailPost }) {
  const { user } = useContext(AuthContext);
  const {
    setShowConfirmation,
    setConfirmationMessage,
    setErrorMessage,
    setShowErrorPopup,
  } = useContext(PopupContext);

  const [description, setDescription] = useState(reply.description);
  const [link, setLink] = useState(reply.link);
  const [picture, setPicture] = useState(reply.picture);

  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedReply = {
      name: user._id,
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

      setDetailPost((prevPost) => {
        // Map over the replies and update the one that matches
        const updatedReplies = prevPost.replies.map((eachPost) =>
          eachPost._id === reply._id ? { ...response.data } : eachPost
        );

        return { ...prevPost, replies: updatedReplies };
      });
      setIsEditing(false),
        setShowConfirmation(true),
        setConfirmationMessage("Reply edited successfully!"),
        setTimeout(() => {
          setShowConfirmation(false);
        }, 1200);
    } catch (error) {
      setShowErrorPopup(true);
      setErrorMessage("Error updating reply");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section className="post-form-section">
      <form className="post-form edit-reply-form" onSubmit={handleSubmit}>
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
        <div className="submit-buttons">
          <button
            type="button"
            onClick={handleCancel}
            className="secondary-button danger-button"
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Update
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditReplyForm;
