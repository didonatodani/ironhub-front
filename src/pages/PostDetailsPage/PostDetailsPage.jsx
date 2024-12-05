import "./PostDetailsPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import arrowUp from "../../assets/up-arrow.png"

import replyIcon from "../../assets/reply-message.png";
const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
  const { _id } = useParams();
  const [detailPost, setDetailPost] = useState(null);
  const navigate = useNavigate()
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

  const handleNavigate = () => navigate("/posts")

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
    <div className="page-container">
      <article className="detail-container">
        <div className="detail-title">
          <h2>{title}</h2>
          <p>{course?.course}</p>
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
    </div>
  );
}

export default PostDetailsPage;
