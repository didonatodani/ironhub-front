import "../Searchbar/Searchbar.css";

import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Searchbar({ setSearchResult }) {
  const [searchTitle, setSearchTitle] = useState("");
  const storedToken = localStorage.getItem("authToken");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTitle(query);
    if (query.trim() === "") {
      setSearchResult(null);
    } else {
      searchPostByTitle(query);
    }
  };

  const searchPostByTitle = (title) => {
    axios
      .get(`${API_URL}/posts/search`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { title },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setSearchResult(
            "The problem you are looking for does not exist. Create a new one!"
          );
        } else {
          setSearchResult(response.data);
        }
      })
      .catch((error) => {
        console.log("This is the error", error);
        setSearchResult("An error occurred while searching.");
      });
  };

  return (
    <div className="input-container">
      <input
        className="input-search"
        type="text"
        placeholder="Search your problem..."
        value={searchTitle}
        onChange={handleSearch}
      />
    </div>
  );
}
export default Searchbar;
