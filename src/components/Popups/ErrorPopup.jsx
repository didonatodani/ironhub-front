import errorIcon from "../../assets/error-icon.svg";
import "./PopupStyling.css";
import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


function ErrorPopup({ id, storedToken }) {
  const { errorMessage, setShowErrorPopup, deleteOn, setDeleteOn, setShowConfirmation, setConfirmationMessage } =
    useContext(PopupContext);

  const navigate = useNavigate();
 
  function deletePost() {
    axios
      .delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setShowConfirmation(true)
        setConfirmationMessage("Post deleted successfully")
        setTimeout(()=>{
          setShowConfirmation(false)
          navigate("/posts")
        }, 1500)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <article className="pop-up-container error">
      <img src={errorIcon} alt="error icon" />
      <h3 className="error-h3">ERROR</h3>
      <p>{errorMessage}</p>

      {deleteOn ? (
        <>
          <button
            onClick={() => {
              deletePost()
              setShowErrorPopup(false);
            }}
            className="secondary-button error-button"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setDeleteOn(false);
              setShowErrorPopup(false);
            }}
            className="secondary-button"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            setShowErrorPopup(false);
          }}
          className="secondary-button error-button"
        >
          Got it
        </button>
      )}
    </article>
  );
}

export default ErrorPopup;
