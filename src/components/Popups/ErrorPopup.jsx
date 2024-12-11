import errorIcon from "../../assets/error-icon.svg";
import "./PopupStyling.css";
import { PopupContext } from "../../context/popups.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ErrorPopup({ id, storedToken, postId, _id, setDetailPost }) {
  const {
    errorMessage,
    setShowErrorPopup,
    deleteOn,
    setDeleteOn,
    setShowConfirmation,
    setConfirmationMessage,
    deletePost,
    setDeletePost,
    deleteReply,
    setDeleteReply,
  } = useContext(PopupContext);

  const navigate = useNavigate();

  function deletePostFunc() {
    console.log(id);
    axios
      .delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setShowConfirmation(true);
        setConfirmationMessage("Post deleted successfully");
        setTimeout(() => {
          setDeletePost(false);
          setShowConfirmation(false);
          navigate("/posts");
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteReplyFunc = async () => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/reply/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setDetailPost((prevPost) => ({
        ...prevPost,
        replies: prevPost.replies.filter((eachPost) => eachPost._id !== _id),
      }));
      setShowConfirmation(true);
      setConfirmationMessage("Reply deleted successfully");
      setTimeout(() => {
        setDeleteReply(false);
        setShowConfirmation(false);
      }, 1200);
    } catch (error) {
      console.log("Error deleting reply: ", error);
    }
  };

  return (
    <div className="pop-up-blocker">
      <article className="pop-up-container error">
        <img src={errorIcon} alt="error icon" />
        <h3 className="error-h3">{deleteOn ? "WARNING" : "ERROR"}</h3>
        <p>{errorMessage}</p>

        {deleteOn ? (
          <>
            <button
              onClick={() => {
                // console.log("deletePost:", deletePost, "deleteReply:", deleteReply)
                deletePost
                  ? deletePostFunc()
                  : deleteReply
                  ? deleteReplyFunc()
                  : null;
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
    </div>
  );
}

export default ErrorPopup;
