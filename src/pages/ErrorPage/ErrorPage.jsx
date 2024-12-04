import "./ErrorPage.css";
import Lucas from "../../assets/Lucas.png";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-container">
      <h1>Oops, our dog ate this page...</h1>
      <img width={280} src={Lucas} alt="lucas-image" />
      <NavLink to={"/"}>
        <button className="back-to-home-button">Return to home</button>
      </NavLink>
    </div>
  );
}

export default ErrorPage;
