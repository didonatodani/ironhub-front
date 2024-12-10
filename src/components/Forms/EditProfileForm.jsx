import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GeneralFormStyles.css";
import service from "../../services/file-upload.service";

const API_URL = import.meta.env.VITE_API_URL;

function EditProfileForm({ id, storedToken, user, setShowEditProfile, setUser }) {
  const { name, email, course, schedule, languages, picture } = user;

  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedCourse, setEditedCourse] = useState(course);
  const [editedSchedule, setEditedSchedule] = useState(schedule);
  const [editedLanguages, setEditedLanguages] = useState(languages);
  const [editedPicture, setEditedPicture] = useState(picture);
  const [loadingImage, setLoadingImage] = useState(false)


  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setLoadingImage(true)
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("picture", e.target.files[0]);
    console.log([...uploadData.entries()]);

    service
      .uploadImage(uploadData)
      .then((response) => {
         console.log("response is: ", response);
         setLoadingImage(false)
        // response carries "fileUrl" which we can use to update the state
        setEditedPicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const editedProfile = {
      name: editedName,
      email: editedEmail,
      course: editedCourse,
      schedule: editedSchedule,
      languages: editedLanguages,
      picture: editedPicture,
    };

    axios
      .put(`${API_URL}/user/${id}`, editedProfile, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data)
        setShowEditProfile(false);
        console.log("Profile updated successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

 return (
  <section className="post-form-section">
    <form className="post-form" onSubmit={handleSubmit}>
      {/* Name Input */}
      <div className="form-div name">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="name"
          onChange={(e) => setEditedName(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div className="form-div email">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="email"
          onChange={(e) => setEditedEmail(e.target.value)}
        />
      </div>

      {/* Course Selection */}
      <fieldset className="form-div">
        <legend>Course</legend>
        <div className="field-div">
          {["Web Development", "UX/UI Design", "Data Analytics"].map((course, idx) => (
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
          ))}
        </div>
      </fieldset>

      {/* Schedule Selection */}
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
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>

      <div className="form-div languages">
        <label htmlFor="languages">Languages:</label>
        <input
          type="text"
          id="languages"
          onChange={(e) => setEditedLanguages(e.target.value)}
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

      </div>

      <div className="submit-buttons">
        <button
          type="button"
          onClick={() => setShowEditProfile(false)}
          className="secondary-button danger-button"
        >
          Cancel
        </button>
        <button  disabled={loadingImage} type="submit" className="primary-button">
          Save Changes
        </button>
      </div>
    </form>
  </section>
);
}
export default EditProfileForm;
