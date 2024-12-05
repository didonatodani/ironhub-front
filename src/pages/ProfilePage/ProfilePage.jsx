import "./ProfilePage.css";
import ProfileCard from "../../components/ProfileCard.jsx/ProfileCard";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);

  const storedToken = localStorage.getItem("authToken");
  const { userId } = useParams();  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("*")

      });
  }, [userId]);

  return (
    <>
      <div className="profile-container">
      {user ? <ProfileCard user={user} /> : <p>Loading user information...</p>}
      </div>
    </>
  );
}

export default ProfilePage;
