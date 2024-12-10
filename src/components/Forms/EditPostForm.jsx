import "./GeneralFormStyles.css";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";
import axios from "axios";
import ErrorPopup from "../Popups/ErrorPopup";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const API_URL = import.meta.env.VITE_API_URL;

function EditPostForm({
  id,
  storedToken,
  detailPost,
  setDetailPost,
  setShowEditForm,
}) {
  const {
    setErrorMessage,
    showErrorPopup,
    setShowErrorPopup,
    setShowConfirmation,
    setConfirmationMessage,
    showConfirmation,
  } = useContext(PopupContext);

  const { user } = useContext(AuthContext);
  const { course, title, description, link, picture } = detailPost;

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLink, setEditedLink] = useState(link);
  const [editedPicture, setEditedPicture] = useState(picture);

  function handleSubmit(e) {
    e.preventDefault();

    const editedPost = {
      name: user._id,
      course: course,
      title: editedTitle,
      description: editedDescription,
      link: editedLink,
      picture: editedPicture,
    };

    axios
      .put(`${API_URL}/posts/${id}`, editedPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setShowConfirmation(true);
        setConfirmationMessage("Post edited successfully!");
        setTimeout(() => {
          setDetailPost(res.data);
          setShowEditForm(false)
          setShowConfirmation(false);
        }, 1500);
      })
      .catch((err) => {
        setShowErrorPopup(true);
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <section className="post-form-section">
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-div title">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder={title}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </div>
        <div className="form-div description">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={(e) => setEditedDescription(e.target.value)}
            defaultValue={description}
          />
        </div>
        <div className="form-div link">
          <label htmlFor="link">Link (optional):</label>
          <input
            type="url"
            name="link"
            id="link"
            placeholder={link}
            onChange={(e) => setEditedLink(e.target.value)}
          />
        </div>
        <div className="form-div picture">
          <label htmlFor="picture">Image (optional):</label>
          <input
            type="url"
            name="picture"
            id="picture"
            placeholder={picture}
            onChange={(e) => setEditedPicture(e.target.value)}
          />
        </div>
        <div className="submit-buttons">
          <button
            onClick={() => setShowEditForm(false)}
            className="secondary-button danger-button"
          >
            Cancel
          </button>
          <button type="submit" className="primary-button ">
            Save Changes
          </button>
        </div>
      </form>
      {showErrorPopup && <ErrorPopup />}
      {showConfirmation && <ConfirmationPopup />}
    </section>
  );
}

export default EditPostForm;
