import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import { useState } from "react";

function ReplyForm() {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="post-form-section">
      <img src={logo} alt="ironhub logo" className="form-logo" />
      <form className="post-form" onSubmit={handleSubmit}>
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

export default ReplyForm;
