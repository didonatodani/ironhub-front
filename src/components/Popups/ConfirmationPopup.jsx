import checkIcon from "../../assets/check-icon.svg";
import "./PopupStyling.css";

import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";

function ConfirmationPopup({ navigate, isSignedUp, setIsSignedUp }) {
  const { setShowConfirmation, confirmationMessage } = useContext(PopupContext);

  return (
    <div className="pop-up-blocker">
      <article className="pop-up-container confirmation">
        <img src={checkIcon} alt="confirmation icon" />
        <h3 className="confirm-h3">GREAT!</h3>
        <p>{confirmationMessage}</p>
        {isSignedUp && (
          <button
            onClick={() => {
              setShowConfirmation(false);
              setIsSignedUp(false);
              navigate("/auth/login");
            }}
            className="primary-button"
          >
            Let's log in!
          </button>
        )}
      </article>
    </div>
  );
}

export default ConfirmationPopup;

// navigate("/auth/login")
