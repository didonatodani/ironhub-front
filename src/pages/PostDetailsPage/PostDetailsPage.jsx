import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import EditPostForm from "../../components/Forms/EditPostForm";

import "./PostDetailsPage.css";
import arrowUp from "../../assets/up-arrow.png";
import replyIcon from "../../assets/reply-message.png";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

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
                <>
                  <button onClick={() => setShowEditForm(true)}>
                    Edit Post
                  </button>
                  <DeleteButton id={_id} storedToken={storedToken}/>
                </>
              )}
            </div>
            <div className="topic-container">
              <div>
                <hr />
                <div className="topic-header">
                  <p>{name?.name}</p>
                  <p>{formattedDate}</p>
                </div>
              </div>
              <div>
                <p>{description}</p>
                <br />
                <p>Image: {picture}</p>
                <br />
                <p>Link: {link}</p>
              </div>
              <div className="btns-container">
                {/* <button>Like</button> */}
                <button className="reply-btn">
                  <img className="reply" src={replyIcon} alt="reply icon" />
                  <p>Reply</p>
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
    </section>
  );
}

export default PostDetailsPage;
