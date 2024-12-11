import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./GeneralFormStyles.css";
import logo from "../../assets/Logo.svg";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";
import ErrorPopup from "../Popups/ErrorPopup.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const { setErrorMessage, showErrorPopup, setShowErrorPopup } =
    useContext(PopupContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newLogin = {
      email,
      password,
    };

    axios
      .post(`${API_URL}/auth/login`, newLogin)
      .then((res) => {
        storeToken(res.data.authToken);
        return authenticateUser();
      })
      .then(()=> {
        navigate("/posts/");
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
        <div className="form-div email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="primary-button">
          Send
        </button>
      </form>
      {showErrorPopup && <ErrorPopup />}
    </section>
  );
}

export default LoginForm;
