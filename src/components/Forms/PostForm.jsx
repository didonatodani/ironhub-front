import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import { useState } from "react";
//import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  //   const likes = 0;

  function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      // name??, course?? FROM CONTEXT!!
      title,
      description,
      link,
      picture,
      //   likes,????
    };
    // console.log(newPost);

    // axios
    //   .post(`${API_URL}/posts`, newPost)

    //   // agregar en post() como tercer parametro  {
    //   //     headers: { Authorization: `Bearer ${token}` }
    //   //   });

    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <section className="post-form-section">
      <img src={logo} alt="ironhub logo" className="form-logo" />
      <form className="post-form" onSubmit={handleSubmit}>
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
