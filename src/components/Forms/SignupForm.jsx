import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";

import axios from "axios";
import service from "../../services/file-upload.service";

import { useState, useContext } from "react";
import { PopupContext } from "../../context/popups.context";

import ErrorPopup from "../Popups/ErrorPopup";
import ConfirmationPopup from "../Popups/ConfirmationPopup";

const API_URL = import.meta.env.VITE_API_URL;

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Web Development");
  const [schedule, setSchedule] = useState("Full-time");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [languages, setLanguages] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const {
    setErrorMessage,
    showErrorPopup,
    setShowErrorPopup,
    setConfirmationMessage,
    showConfirmation,
    setShowConfirmation,
  } = useContext(PopupContext);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setPicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      name,
      email,
      course,
      schedule,
      linkedin,
      picture,
      languages,
      password,
    };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((res) => {
        setShowConfirmation(true);
        setConfirmationMessage("New user created sucessfully");
        setIsSignedUp(true);
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

        <div className="form-div name">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-div email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setSchedule(e.target.value)}
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
          <label htmlFor="picture">Linkedin URL:</label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>

        <div className="form-div languages">
          <label htmlFor="course">Language:</label>
          <input
            type="languages"
            name="languages"
            id="languages"
            onChange={(e) => setLanguages(e.target.value)}
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

        <div className="form-div password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="primary-button">
          Sign up
        </button>
      </form>

      {showErrorPopup && <ErrorPopup />}
      {showConfirmation && (
        <ConfirmationPopup
          isSignedUp={isSignedUp}
          setIsSignedUp={setIsSignedUp}
        />
      )}
    </section>
  );
}

export default SignupForm;
