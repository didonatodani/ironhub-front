import "./ReplyCard.css";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context.jsx";
import { useState, useContext } from "react";
import ReplyForm from "../Forms/EditReplyForm.jsx";
import { useParams } from "react-router-dom";
import ErrorPopup from "../Popups/ErrorPopup.jsx";

function ReplyCard({ reply, setDetailPost }) {
  const { _id, created, description, link, name, picture } = reply;
  const { postId } = useParams();
  const formattedDate = new Date(created).toLocaleDateString("en-GB");
  const { user } = useContext(AuthContext);
  const {
    setDeleteOn,
    setShowErrorPopup,
    setDeleteReply,
    showErrorPopup,
    deleteReply,
    setErrorMessage,
  } = useContext(PopupContext);
  const storedToken = localStorage.getItem("authToken");

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => setIsEditing(true);

  return (
    <>
      <article className="reply-container">
        <div>
          <hr />
          <div className="reply-header">
            <p>{name?.name}</p>
            <p>{formattedDate}</p>
          </div>
        </div>
        <p>{description}</p>
        <img src={picture} alt="picture" />
        <p>
          Link:{" "}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          )}
        </p>
        <div className="reply-btns">
          {name._id === user._id && (
            <>
              {!isEditing && (
                <button onClick={handleEditing} className="primary-button">
                  Edit
                </button>
              )}
              {isEditing && (
                <ReplyForm
                  reply={reply}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setDetailPost={setDetailPost}
                />
              )}
              <button
                onClick={() => {
                  setShowErrorPopup(true),
                    setDeleteOn(true),
                    setDeleteReply(true),
                    setErrorMessage(
                      "Are you sure you want to delete the reply?"
                    );
                }}
                className="secondary-button danger-button"
              >
                Delete
              </button>
            </>
          )}
        </div>
        {showErrorPopup && deleteReply && (
          <ErrorPopup
            postId={postId}
            storedToken={storedToken}
            _id={_id}
            setDetailPost={setDetailPost}
          />
        )}
      </article>
    </>
  );
}

export default ReplyCard;
