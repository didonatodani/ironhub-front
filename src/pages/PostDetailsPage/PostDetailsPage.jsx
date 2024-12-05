import "./PostDetailsPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import replyIcon from "../../assets/reply-message.png";
const API_URL = import.meta.env.VITE_API_URL;

function PostDetailsPage() {
  const { _id } = useParams();
  const [detailPost, setDetailPost] = useState(null);

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
          </div>
        </div>
      </article>
    </div>
  );
}

export default PostDetailsPage;
