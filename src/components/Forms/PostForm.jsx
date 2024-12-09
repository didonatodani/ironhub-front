import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";

import axios from "axios";
import service from "../../services/file-upload.service";
import ErrorPopup from "../Popups/ErrorPopup";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const API_URL = import.meta.env.VITE_API_URL;

function PostForm() {
  const { user } = useContext(AuthContext);
  const {
    imageError,
    setImageError,
    imageMessage,
    setImageMessage,
    setErrorMessage,
    showErrorPopup,
    setShowErrorPopup,
    setShowConfirmation,
    setConfirmationMessage,
    showConfirmation,
  } = useContext(PopupContext);

  // const [name, setName] = useState("");
  const [course, setCourse] = useState("Web Development");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setLoadingImage(true);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("picture", e.target.files[0]);
    //  console.log([...uploadData.entries()]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setLoadingImage(false);
        setPicture(response.fileUrl);
        setImageError(false);
      })
      .catch((err) => {
        setImageError(true);
        setImageMessage(err.response.data.message.message);
      });
  };

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      name: user._id,
      course,
      title,
      description,
      link,
      picture,
    };

    axios
      .post(`${API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setShowConfirmation(true);
        setConfirmationMessage("Post created successfully!");
        setTimeout(() => {
          setShowConfirmation(false);
          navigate("/posts");
        }, 1200);
      })
      .catch((err) => {
        setShowErrorPopup(true);
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <section className="post-form-section">
      <img src={logo} alt="ironhub logo" className="form-logo" />
      <form className="post-form" onSubmit={handleSubmit}>
        {/* Course Selection */}
        <fieldset className="form-div">
          <legend>Course</legend>
          <div className="field-div">
            {["Web Development", "UX/UI Design", "Data Analytics"].map(
              (course, idx) => (
                <div key={course}>
                  <input
                    type="radio"
                    id={course.toLowerCase().replace(" ", "-")}
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    defaultChecked={idx === 0}
                  />
                  <label htmlFor={course.toLowerCase().replace(" ", "-")}>
                    {course.slice(0, 2).toUpperCase()}
                  </label>
                </div>
              )
            )}
          </div>
        </fieldset>

        <div className="form-div title">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-div description">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-div link">
          <label htmlFor="link">Link (optional):</label>
          <input
            type="url"
            name="link"
            id="link"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="form-div picture">
          <label htmlFor="picture">Image (optional):</label>
          <label htmlFor="file-upload" className="file-upload">
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={(e) => handleFileUpload(e)}
            />
          </label>
          {imageError && <small>{imageMessage}</small>}
        </div>
        <div className="post-buttons">
          {/* FIX THIS BUTTON */}
          {/* IF WE ADD: onClick={()=>{navigate("/posts")}} there is an error for cancelling the post request */}
          <button className="secondary-button danger-button" onClick={()=>{navigate("/posts")}}>Go back</button>
          <button
            disabled={loadingImage}
            type="submit"
            className="primary-button"
          >
            Send
          </button>
        </div>
      </form>

      {showErrorPopup && <ErrorPopup />}

      {showConfirmation && <ConfirmationPopup />}
    </section>
  );
}

export default PostForm;
