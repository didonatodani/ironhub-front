import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { useContext } from "react";


function DeleteButton({ id, storedToken }) {
  const navigate = useNavigate();

  function deletePost() {
    axios
      .delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log("post deleted successfully", res);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmDelete() {

    if (ok) {
      deletePost();
    }
  }

  return (
    <button onClick={confirmDelete} className="secondary-button danger-button">
      Delete Post
    </button>
  );
}
export default DeleteButton;
