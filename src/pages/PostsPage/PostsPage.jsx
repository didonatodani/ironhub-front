import "./PostsPage.css";
import arrowUp from "../../assets/arrow-up.png";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import PostCard from "../../components/PostCard/PostCard";
import Searchbar from "../../components/Searchbar/Searchbar";
import arrowUp from "../../assets/arrow-up.png";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function PostsPage() {
  const [postsArray, setPostsArray] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [course, setCourse] = useState("All Courses");
  const [sortBy, setSortBy] = useState("created");
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const query = new URLSearchParams({
      course,
      sortBy,
      order,
    });
    axios
      .get(`${API_URL}/posts?${query.toString()}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setPostsArray(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("*");
      });
  }, [course, sortBy, order]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="dashboard">
      <section className="search-section">
        <Searchbar setSearchResult={setSearchResult} />
        <div className="filter-controls">
          <div className="custom-select">
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option className="option" value="">
                All Courses
              </option>
              <option value="Web Development">Web Development</option>
              <option value="UX/UI Design">UX/Ui Design</option>
              <option value="Data Analytics">Data Analytics</option>
            </select>
          </div>
          <div className="custom-select">
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="add-post">
            <NavLink to={"/newpost"}>
              <button className="primary-button">Add A Post</button>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="posts-container">
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((result) => (
            <Link
              key={result._id}
              to={`/posts/${result._id}`}
              className={`post-card ${result.course.toLowerCase().slice(0, 2)}`}
            >
              <PostCard post={result} />
            </Link>
          ))
        ) : typeof searchResult === "string" ? (
          <p>{searchResult}</p>
        ) : (
          <section className="posts-container">
            {postsArray.map((post, index) => (
              <Link
                key={index}
                to={`/posts/${post._id}`}
                className={`post-card ${post.course
                  ?.toLowerCase()
                  .slice(0, 2)}`}
              >
                <PostCard post={post} />
              </Link>
            ))}
          </section>
        )}
      </section>
      <button id="button-up" onClick={scrollToTop}>
        <img src={arrowUp} alt="arrow up icon" />
      </button>
    </div>
  );
}

export default PostsPage;
