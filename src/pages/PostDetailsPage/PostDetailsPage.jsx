import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import EditPostForm from "../../components/Forms/EditPostForm";

import "./PostDetailsPage.css";
import replyIcon from "../../assets/reply-message.png";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import ReplyCard from "../../components/ReplyCard/ReplyCard";
import PostReplyForm from "../../components/Forms/PostReplyForm";
import arrowUp from "../../assets/arrow-up.png";
const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [detailPost, setDetailPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

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

  const handleNavigate = () => navigate("/posts");

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

  const toggleReplyForm = () => setShowReplyForm(!showReplyForm);

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
                  <DeleteButton id={_id} storedToken={storedToken} />
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
                {/* add user picture here */}
                {/* <img src={user.picture} alt="" /> */}
                <p>{name?.name}</p>
                <p>{formattedDate}</p>
              </div>
              <div className="topic-body">
                <p>{description}</p>
                {/* <p className="link-text">Image: {picture}</p> */}
                <img src={picture} alt="picture" />
                <p>
                  Link:{" "}
                  {link && (
                    <a className="link-text" href={link} target="_blank">
                      {link}
                    </a>
                  )}
                </p>
              </div>
              <div className="btns-container">
                <button
                  className="primary-button reply-button-container"
                  onClick={() => setShowReplyForm(true)}
                >
                  <img className="reply" src={replyIcon} alt="reply icon" />
                  Reply
                </button>
                <button className="secondary-button danger-button" onClick={handleNavigate}>Go back</button>
              </div>
            </div>
          </article>
          <button id="btn-up" onClick={scrollToTop}>
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
      </section>
    </section>
  );
}

export default PostDetailsPage;
