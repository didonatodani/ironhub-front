import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import EditPostForm from "../../components/Forms/EditPostForm";

import "./PostDetailsPage.css";
import arrowUp from "../../assets/up-arrow.png";
import replyIcon from "../../assets/reply-message.png";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import ReplyCard from "../../components/ReplyCard/ReplyCard";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [detailPost, setDetailPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

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
                <p className="link-text">Image: {picture}</p>
                <p className="link-text">Link: {link}</p>
              </div>
              <div className="btns-container">
                {/* <button>Like</button> */}
                <button className="reply-btn">
                  <img className="reply" src={replyIcon} alt="reply icon" />
                  Reply
                </button>
                <button onClick={handleNavigate}>Go back</button>
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
      <section className="replies-container">
        {detailPost.replies && detailPost.replies.length > 0 ? (
          detailPost.replies.map((reply) => (
            <div key={reply._id}>
              <ReplyCard reply={reply} setDetailPost={setDetailPost}/>
            </div>
          ))
        ) : (
          <p>No replies yet. Be the first to reply!</p>
        )}
      </section>
    </section>
  );
}

export default PostDetailsPage;
