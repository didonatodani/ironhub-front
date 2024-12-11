import "./GeneralFormStyles.css";

import axios from "axios";
import service from "../../services/file-upload.service";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";

const API_URL = import.meta.env.VITE_API_URL;

function PostReplyForm({ postId, setDetailPost, setShowReplyForm }) {
  const { user } = useContext(AuthContext);
  const {
    imageError, setImageError,
    imageMessage, setImageMessage,
    setShowConfirmation,
    setConfirmationMessage,
    setErrorMessage,
    setShowErrorPopup,
  } = useContext(PopupContext);

  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setLoadingImage(true);
    uploadData.append("picture", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setLoadingImage(false);
        setPicture(response.fileUrl);
        setImageError(false);
      })
      .catch((err) => {
        setImageError(true);
        setImageMessage(err.response.data.message.message);
      });
  };

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
      setDetailPost((prevPost) => ({
        ...prevPost,
        replies: [...prevPost.replies, response.data.reply],
      }));

      setShowReplyForm(false);
      setShowConfirmation(true);
      setConfirmationMessage("Reply created successfully!");
      setTimeout(() => {
        setShowConfirmation(false);
      }, 1200);
    } catch (error) {
      setShowErrorPopup(true);
      setErrorMessage(error.response.data.message);
    }
  };

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
            type="file"
            name="picture"
            id="picture"
            className="file-upload"
            onChange={(e) => handleFileUpload(e)}
          />
          {imageError && <small>{imageMessage}</small>}
        </div>
        <div className="submit-buttons">
          <button
            type="button"
            className="secondary-button danger-button"
            onClick={()=>{setShowReplyForm(false)}}
          >
            Cancel
          </button>
          <button
            disabled={loadingImage}
            type="submit"
            className="primary-button"
          >
            Save Reply
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostReplyForm;
