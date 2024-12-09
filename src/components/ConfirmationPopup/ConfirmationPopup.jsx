import checkIcon from "../../assets/check-icon.svg";
import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";

function ConfirmationPopup() {
  const { setShowConfirmation, confirmationMessage } =
    useContext(PopupContext);

  return (
    <article>
      <img src={checkIcon} alt="confirmation icon" />
      <h3>GREAT!</h3>
      <p>{confirmationMessage}</p>
      <button
        onClick={() => {
          setShowConfirmation(false);
        }}
        className="primary-button"
      >
        Got it
      </button>
    </article>
  );
}

export default ConfirmationPopup;
