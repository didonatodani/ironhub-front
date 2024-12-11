import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PopupContext } from "../../context/popups.context";

const API_URL = import.meta.env.VITE_API_URL;

// Importing styles and images
import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import ErrorPopup from "../Popups/ErrorPopup";
import ConfirmationPopup from "../Popups/ConfirmationPopup";
import service from "../../services/file-upload.service";


function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Web Development");
  const [schedule, setSchedule] = useState("Full-time");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [languages, setLanguages] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false)

  const { setErrorMessage, showErrorPopup, setShowErrorPopup, setConfirmationMessage, showConfirmation, setShowConfirmation } =
    useContext(PopupContext);

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("picture", e.target.files[0]);


    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
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
        setShowConfirmation(true)
        setConfirmationMessage("New user created sucessfully")
        setIsSignedUp(true)

      })
      .catch((err) => {
        setShowErrorPopup(true)
        setErrorMessage(err.response.data.message)

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
          <legend>Select your course</legend>
          <div className="field-div">
            <div>
              <input
                type="radio"
                id="web"
                name="course"
                value="Web Development"
                onChange={(e) => setCourse(e.target.value)}
                defaultChecked
              />
              <label htmlFor="web">W.D.</label>
            </div>
            <div>
              <input
                type="radio"
                id="ux"
                name="course"
                value="UX/UI Design"
                onChange={(e) => setCourse(e.target.value)}
              />
              <label htmlFor="ux">UX/UI</label>
            </div>
            <div>
              <input
                type="radio"
                id="data"
                name="course"
                value="Data Analytics"
                onChange={(e) => setCourse(e.target.value)}
              />
              <label htmlFor="data">D.A.</label>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-div">
          <legend>Select your course schedule:</legend>
          <div className="field-div">
            <div>
              <input
                type="radio"
                id="full-time"
                name="schedule"
                value="Full-time"
                onChange={(e) => setSchedule(e.target.value)}
                defaultChecked
              />
              <label htmlFor="full-time">Full-time</label>
            </div>
            <div>
              <input
                type="radio"
                id="part-time"
                name="schedule"
                value="Part-time"
                onChange={(e) => setSchedule(e.target.value)}
              />
              <label htmlFor="part-time">Part-time</label>
            </div>
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
          navigate={navigate}
          isSignedUp={isSignedUp}
          setIsSignedUp={setIsSignedUp}
        />
      )}
    </section>
  );
}

export default SignupForm;
