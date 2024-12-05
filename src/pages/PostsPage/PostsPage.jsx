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

  // const [course, setCourse] = useState("")
  // const [order, setOrder] = useState("asc")
  // const [filterByUser, setFilterByUser] = useState(false)

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

        {/* <div className="filter-controls"> */}
          {/* <label> */}
            {/* Select Course:
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">All Courses</option>
              <option value="Web Development">Web Development</option>
              <option value="UX/UI Design">UX/Ui Design</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
          </label> */}
          {/* <label>
            Order:
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label> */}
          {/* <label>
            <input type="checkbox" checked={filterByUser} onChange={(e) => setFilterByUser(e.target.checked)} />
            Show my posts only:
          </label> */}
        {/* </div> */}
      </section>

      <section className="posts-container">
        {searchResult ? (
          // IF we have an input, show it
          searchResult.map((result) => {
            return (
              <Link
                key={result._id}
                to={`/posts/${result._id}`}
                className={`post-card ${result.course.toLowerCase()
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
                  className={`post-card ${post.course?.toLowerCase().slice(0, 2)}`}
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
