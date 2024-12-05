import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PostCard from "../../components/PostCard/PostCard";
import "./PostsPage.css";
import Searchbar from "../../components/Searchbar/Searchbar";

const API_URL = import.meta.env.VITE_API_URL;

function PostsPage() {
  const [postsArray, setPostsArray] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setPostsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section>
        <Searchbar setSearchResult={setSearchResult} />
      </section>
      <section className="posts-container">
        {searchResult ? (
          // IF we have an input, show it
          searchResult.map((result) => {
            return (
              <Link
                key={result._id}
                to={`/posts/${result._id}`}
                className={`post-card ${result.course
                  ?.toLowerCase()
                  .slice(0, 2)}`}
              >
                <PostCard post={result} />
              </Link>
            );
          })
        ) : (
          // If we dont have an input, show all post
          <section className="posts-container">
            {postsArray.map((post, index) => {
              return (
                <Link
                  key={index}
                  to={`/posts/${post._id}`}
                  className={`post-card ${post.course?.course

                    .toLowerCase()

                    .slice(0, 2)}`}
                >
                  <PostCard post={post} />
                </Link>
              );
            })}
          </section>
        )}
      </section>
    </>
  );
}

export default PostsPage;
