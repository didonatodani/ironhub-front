import errorIcon from "../../assets/error-icon.svg";
import "./PopupStyling.css";
import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";

function ErrorPopup() {
  const { errorMessage, setShowErrorPopup } = useContext(PopupContext);

  return (
    <article className="pop-up-container error">
      <img src={errorIcon} alt="error icon" />
      <h3 className="error-h3">ERROR</h3>
      <p>{errorMessage}</p>
      <button
        onClick={() => {
          setShowErrorPopup(false);
        }}
        className="secondary-button error-button"
      >
        Got it
      </button>
    </article>
  );
}

export default ErrorPopup;
