import "./ReplyCard.css";
import { AuthContext } from "../../context/auth.context";
import { useState, useContext } from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import ReplyForm from "../Forms/ReplyForm.jsx";


function ReplyCard({ reply, setDetailPost }) {
  const { _id, created, description, link, name, picture } = reply;
  const formattedDate = new Date(created).toLocaleDateString("en-GB");
  const { user } = useContext(AuthContext);
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
        <p>Image: {picture}</p>
        <p>Link: {link}</p>
        <div className="reply-btns">
          {name._id === user._id && (
            <>
            <button onClick={handleEditing}>
              {isEditing ? (
                <ReplyForm
                  reply={reply}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setDetailPost={setDetailPost}
                />
              ) : (
                "Edit"
              )}
            </button>

              <DeleteButton id={_id} storedToken={storedToken} />
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default ReplyCard;
