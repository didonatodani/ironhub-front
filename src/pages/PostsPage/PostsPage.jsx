import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PostCard from "../../components/PostCard/PostCard";

import "./PostsPage.css";

const API_URL = import.meta.env.VITE_API_URL;

function PostsPage() {
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        setPostsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="posts-container">
      {postsArray.map((post, index) => {
        return (
          <Link key={index}to={`/posts/${post._id}`} className={`post-card ${post.course?.course.toLowerCase().slice(0,2)}`}>
            <PostCard post={post} />
          </Link>
        );
      })}
    </section>
  );
}

export default PostsPage;
