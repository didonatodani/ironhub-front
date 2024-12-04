import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg"

function PostForm() {
  return (
    <section className="post-form-section">
        <img src={logo} alt="ironhub logo" className="form-logo"/>
      <form className="post-form">
        <div className="form-div fullName">
          <label htmlFor="fullName">Name:</label>
          <input type="text" name="fullName" id="fullName" />
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
                defaultChecked
              />
              <label htmlFor="web">W.D.</label>
            </div>
            <div>
              <input type="radio" id="ux" name="course" value="UX/UI Design" />
              <label htmlFor="ux">UX/UI</label>
            </div>
            <div>
              <input
                type="radio"
                id="data"
                name="course"
                value="Data Analytics"
              />
              <label htmlFor="ux">D.A.</label>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-div">
          <legend>Select you schedule</legend>
          <div className="field-div">
            <div>
              <input
                type="radio"
                id="full-time"
                name="schedule"
                value="Full-time"
                defaultChecked
              />
              <label htmlFor="">Full-time</label>
            </div>
            <div>
              <input
                type="radio"
                id="part-time"
                name="schedule"
                value="Part-time"
              />
              <label htmlFor="">Part-time</label>
            </div>
          </div>
        </fieldset>
        <div className="form-div title">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form-div description">
          <label htmlFor="description">Description:</label>
          <textarea id="description"/>
        </div>
        <div className="form-div link">
          <label htmlFor="link">Link (optional):</label>
          <input type="url" name="link" id="link" />
        </div>
        <div className="form-div image">
          <label htmlFor="image">Image (optional):</label>
          <input type="url" name="image" id="image" />
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default PostForm;
