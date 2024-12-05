import axios from "axios";
import { useState } from "react";

import "../Searchbar/Searchbar.css";

const API_URL = import.meta.env.VITE_API_URL;

function Searchbar({setSearchResult }) {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    console.log(query);
    setSearchTitle(query);
    if (query.trim() === "") {
      // When the input is empty, you see all post
      setSearchResult(null);
    } 
    else {
      searchPostByTitle(query);
    }
   
  };

  const searchPostByTitle = async (title) => {
    try {
      const response = await axios.get(`${API_URL}/posts/search`, {
        params: { title },
      });
      console.log(response.data);
      setSearchResult(response.data);
    } catch (error) {
      console.log("This is the error", error);
    }
  };

  return (
    <div>
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
