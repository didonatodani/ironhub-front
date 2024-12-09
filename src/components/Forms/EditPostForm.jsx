import "./GeneralFormStyles.css";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function EditPostForm({
  id,
  storedToken,
  detailPost,
  setDetailPost,
  setShowEditForm,
}) {
  const { user } = useContext(AuthContext);
  const { course, title, description, link, picture } = detailPost;

  const [editedTitle, setEditedTitle] = useState(title);
  // const [editedCourse, setEditedCourse] = useState(course)
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLink, setEditedLink] = useState(link);
  const [editedPicture, setEditedPicture] = useState(picture);

  function handleSubmit(e) {
    e.preventDefault();

    const editedPost = {
      name: user._id,
      // course: editedCourse, or to course
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
        setDetailPost(res.data);
        setShowEditForm(false);
        console.log("post edited successfully");
      })
      .catch((err) => {
        console.log(err);
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
        {/* <fieldset className="form-div">
          <legend>Course</legend>
          <div className="field-div">
            <div>
              <input
                type="radio"
                id="web"
                name="course"
                value="Web Development"
                onChange={(e) => setEditedCourse(e.target.value)}
                // defaultChecked={course}
              />
              <label htmlFor="web">W.D.</label>
            </div>
            <div>
              <input
                type="radio"
                id="ux"
                name="course"
                value="UX/UI Design"
                onChange={(e) => setEditedCourse(e.target.value)}
                // defaultChecked={course}
              />
              <label htmlFor="ux">UX/UI</label>
            </div>
            <div>
              <input
                type="radio"
                id="data"
                name="course"
                value="Data Analytics"
                onChange={(e) => setEditedCourse(e.target.value)}
                // defaultChecked={course}
              />
              <label htmlFor="data">D.A.</label>
            </div>
          </div>
        </fieldset> */}
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
    </section>
  );
}

export default EditPostForm;
