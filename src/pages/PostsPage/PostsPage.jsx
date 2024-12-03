import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import "./PostsPage.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PostsPage() {
  const [postsArray, setPostsArray] = useState([]);


  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        console.log(res.data);
        setPostsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="posts-container">
      {postsArray.map((post, index) => {
        return <PostCard key={index} post={post}/>;
      })}
    </section>
  );
}

export default PostsPage;
