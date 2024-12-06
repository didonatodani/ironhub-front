import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function DeleteButton({ id, storedToken}) {
  const navigate = useNavigate();

  function deletePost() {

// ADD POP UP HERE TO CONFIRM THE USER WANTS TO DELETE THE POST!!!!
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
  return <button onClick={deletePost}>Delete Post</button>;
}
export default DeleteButton;
