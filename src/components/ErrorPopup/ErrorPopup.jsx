import errorIcon from "../../assets/error-icon.svg";
import "./ErrorPopup.css";
import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";

function ErrorPopup() {
  const { errorMessage, setShowErrorPopup } = useContext(PopupContext);

  return (
    <article className="error-popup">
      <img src={errorIcon} alt="error icon" />
      <h3>ERROR</h3>
      <p>{errorMessage}</p>
      <button
        onClick={() => {
          setShowErrorPopup(false);
        }}
        className="primary-button"
      >
        Got it
      </button>
    </article>
  );
}

export default ErrorPopup;
