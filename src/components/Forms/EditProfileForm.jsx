import "./GeneralFormStyles.css";

import axios from "axios";
import service from "../../services/file-upload.service";
import { useState, useContext } from "react";
import { PopupContext } from "../../context/popups.context";

import ErrorPopup from "../Popups/ErrorPopup";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const API_URL = import.meta.env.VITE_API_URL;

function EditProfileForm({
  id,
  storedToken,
  user,
  setShowEditProfile,
  setUser,
}) {

  const { name, email, course, schedule, languages, picture, linkedin } = user;

  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedCourse, setEditedCourse] = useState(course);
  const [editedSchedule, setEditedSchedule] = useState(schedule);
  const [editedLanguages, setEditedLanguages] = useState(languages);
  const [editedLinkedin, setEditedLinkedin] = useState(linkedin);
  const [editedPicture, setEditedPicture] = useState(picture);
  const [loadingImage, setLoadingImage] = useState(false);

  const { imageError, setImageError, imageMessage, setImageMessage, showConfirmation, setShowConfirmation, setConfirmationMessage, showErrorPopup, setShowErrorPopup, setErrorMessage } =
    useContext(PopupContext);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setLoadingImage(true);

    uploadData.append("picture", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setLoadingImage(false);
        setEditedPicture(response.fileUrl);
        setImageError(false)
      })
      .catch((err) => {
        setImageError(true)
        setImageMessage(err.response.data.message.message)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedProfile = {
      name: editedName,
      email: editedEmail,
      course: editedCourse,
      schedule: editedSchedule,
      linkedin: editedLinkedin,
      languages: editedLanguages,
      picture: editedPicture,
    };

    axios
      .put(`${API_URL}/user/${id}`, editedProfile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data);
        setShowConfirmation(true);
        setConfirmationMessage("Profile updated successfully");
        setTimeout(() => {
          setShowConfirmation(false);
          setShowEditProfile(false);
        }, 1200)
      })
      .catch((err) => {
        setShowErrorPopup(true);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <section className="post-form-section">
      <form className="post-form" onSubmit={handleSubmit}>

        <div className="form-div name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            onChange={(e) => setEditedName(e.target.value)}
            defaultValue={name}
          />
        </div>

        <div className="form-div email">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="email"
            onChange={(e) => setEditedEmail(e.target.value)}
            defaultValue={email}
          />
        </div>

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
                    onChange={(e) => setEditedCourse(e.target.value)}
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

        <fieldset className="form-div">
          <legend>Select your course schedule:</legend>
          <div className="field-div">
            {["Full-time", "Part-time"].map((schedule, idx) => (
              <div key={schedule}>
                <input
                  type="radio"
                  id={schedule.toLowerCase().replace(" ", "-")}
                  name="schedule"
                  value={schedule}
                  onChange={(e) => setEditedSchedule(e.target.value)}
                  defaultChecked={idx === 0}
                />
                <label htmlFor={schedule.toLowerCase().replace(" ", "-")}>
                  {schedule}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="form-div linkedin">
          <label htmlFor="linkedin">LinkedIn URL:</label>
          <input
            type="url"
            id="linkedin"
            onChange={(e) => setEditedLinkedin(e.target.value)}
            defaultValue={linkedin}
          />
        </div>

        <div className="form-div languages">
          <label htmlFor="languages">Languages:</label>
          <input
            type="text"
            id="languages"
            onChange={(e) => setEditedLanguages(e.target.value)}
            defaultValue={languages}
          />
        </div>

        <div className="form-div picture">
          <label htmlFor="picture">Image (optional):</label>
          <label htmlFor="file-upload" className="file-upload">
            <input
              type="file"
              id="picture"
              onChange={(e) => {
                handleFileUpload(e);
              }}
            />
          </label>
          {imageError && <small>{imageMessage}</small>}

        </div>

        <div className="submit-buttons">
          <button
            type="button"
            onClick={() => setShowEditProfile(false)}
            className="secondary-button danger-button"
          >
            Cancel
          </button>
          <button
            disabled={loadingImage}
            type="submit"
            className="primary-button"
          >
            Save Changes
          </button>
        </div>
      </form>
      
      {showErrorPopup && <ErrorPopup />}
      {showConfirmation && <ConfirmationPopup />}
    </section>
  );
}
export default EditProfileForm;
