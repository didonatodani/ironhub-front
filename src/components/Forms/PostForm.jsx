import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PostForm() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");

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
        console.log("post sent successfully");
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="post-form-section">
      <img src={logo} alt="ironhub logo" className="form-logo" />
      <form className="post-form" onSubmit={handleSubmit}>
        <fieldset className="form-div">
          <legend>Course</legend>
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
              <label htmlFor="ux">D.A.</label>
            </div>
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
          <input
            type="url"
            name="picture"
            id="picture"
            onChange={(e) => setPicture(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
    </section>
  );
}

export default PostForm;
