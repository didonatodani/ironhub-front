import "./GeneralFormStyles.css";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

function EditProfileForm({
  id,
  storedToken,
  user,
  setShowEditProfile,
}) {
  const { name, email, course, schedule, languages, picture } = user;

  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedCourse, setEditedCourse] = useState(course);
  const [editedSchedule, setEditedSchedule] = useState(schedule);
  const [editedLanguages, setEditedLanguages] = useState(languages);
  const [editedPicture, setEditedPicture] = useState(picture);

  function handleSubmit(e) {
    e.preventDefault();

    const editedProfile = {
      user: user._id,
      name: name,
      email: editedEmail,
      course: editedCourse,
      schedule: editedSchedule,
      languages: editedLanguages,
      picture: editedPicture,
    };

    axios
      .put(`${API_URL}/user/${userId}`, editedProfile {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("*")

      });

  return (
    <section className="post-form-section">
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-div name">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={name}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="form-div email">
          <label htmlFor="email">Email: </label>
          <textarea
            id="email"
            onChange={(e) => setEditedEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-div course">
          <label htmlFor="email">Course: </label>
          <textarea
            id="course"
            onChange={(e) => setEditedCourse(e.target.value)}
            value={course}
          />
        </div>
        <div className="form-div picture">
          <label htmlFor="picture">Image:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            placeholder={picture}
            onChange={(e) => setEditedPicture(e.target.value)}
          />
        </div>
        <div className="form-div schedule">
          <label htmlFor="link">Schedule:</label>
          <input
            type="url"
            name="schedule"
            id="schedule"
            placeholder={link}
            onChange={(e) => setEditedSchedule(e.target.value)}
          />
        </div>
        <div className="form-div language">
          <label htmlFor="link">Language: </label>
          <input
            type="url"
            name="languages"
            id="languages"
            placeholder={languages}
            onChange={(e) => setEditedLanguages(e.target.value)}
          />
        </div>
        <div className="submit-buttons">
          <button
            onClick={() => setShowEditProfile(false)}
            className="secondary-button danger-button"
          >
            Cancel
          </button>
          <button type="submit" className="primary-button ">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProfileForm;
