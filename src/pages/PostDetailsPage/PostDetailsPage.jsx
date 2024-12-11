import "./PostDetailsPage.css";
import replyIcon from "../../assets/reply-message.png";
import arrowUp from "../../assets/arrow-up.png";
import ConfirmationPopup from "../../components/Popups/ConfirmationPopup";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { PopupContext } from "../../context/popups.context";

import EditPostForm from "../../components/Forms/EditPostForm";
import ErrorPopup from "../../components/Popups/ErrorPopup";
import ReplyCard from "../../components/ReplyCard/ReplyCard";
import PostReplyForm from "../../components/Forms/PostReplyForm";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const {
    setDeleteOn,
    showErrorPopup,
    setShowErrorPopup,
    showConfirmation,
    setDeletePost,
    deleteReply,
    setErrorMessage,
  } = useContext(PopupContext);

  const [detailPost, setDetailPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setDetailPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!detailPost) {
    return <p>Loading...</p>;
  }

  const { name, title, description, created, picture, link, course } =
    detailPost;
  const formattedDate = new Date(created).toLocaleDateString("en-GB");

  return (
    <section className="page-container">
      {!showEditForm ? (
        <>
          <article className="detail-container">
            <div className="main-post-header">
              <div className="detail-title">
                <h2>{title}</h2>
                <p>{course}</p>
              </div>
              {user._id === name._id && (
                <div className="crud-buttons">
                  <button
                    onClick={() => {
                      setShowErrorPopup(true);
                      setDeleteOn(true);
                      setDeletePost(true);
                      setErrorMessage(
                        "Are you sure you want to delete the post?"
                      );
                    }}
                    className="secondary-button danger-button"
                  >
                    Delete Post
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => setShowEditForm(true)}
                  >
                    Edit Post
                  </button>
                </div>
              )}
            </div>
            <div className="topic-container">
              <div className="topic-header">
                <p>{name?.name}</p>
                <p>{formattedDate}</p>
              </div>
              <div className="topic-body">
                <p>{description}</p>
                {picture && <img src={picture} alt="picture" />}
                {link && (
                  <p>
                    Link:{" "}
                    <a
                      className="link-text"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </p>
                )}
              </div>
              <div className="buttons-container">
                <Link to={"/posts"} className="link-button">
                  <button className="secondary-button danger-button">
                    Go back
                  </button>
                </Link>
                <button
                  className="primary-button reply-button-container"
                  onClick={() => {
                    setShowReplyForm(true);
                    const formDiv = document.querySelector(".primary-button");
                    if (formDiv) {
                      formDiv.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <img className="reply" src={replyIcon} alt="reply icon" />
                  Reply
                </button>
              </div>
            </div>
          </article>
          <button id="button-up" onClick={scrollToTop}>
            <img src={arrowUp} alt="arrow up icon" />
          </button>
        </>
      ) : (
        <EditPostForm
          id={_id}
          storedToken={storedToken}
          detailPost={detailPost}
          setDetailPost={setDetailPost}
          setShowEditForm={setShowEditForm}
        />
      )}

      {/* Conditionally render the ReplyForm */}
      {showReplyForm && (
        <PostReplyForm
          postId={_id}
          setDetailPost={setDetailPost}
          setShowReplyForm={setShowReplyForm}
        />
      )}
      <section className="replies-container">
        {detailPost.replies && detailPost.replies.length > 0 ? (
          detailPost.replies.map((reply) => (
            <ReplyCard
              key={reply._id}
              reply={reply}
              setDetailPost={setDetailPost}
            />
          ))
        ) : (
          <section className="noreply-container">
            <p>No replies yet. Be the first to reply!</p>
          </section>
        )}

        {showErrorPopup && !deleteReply && (
          <ErrorPopup id={_id} storedToken={storedToken} />
        )}
        {showConfirmation && <ConfirmationPopup />}
      </section>
    </section>
  );
}

export default PostDetailsPage;
