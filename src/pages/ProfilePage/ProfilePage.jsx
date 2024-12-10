import "./ProfilePage.css";
import ProfileCard from "../../components/ProfileCard.jsx/ProfileCard";
import EditProfileForm from "../../components/Forms/EditProfileForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showEditProfileForm, setShowEditProfile] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("*");
      });
  }, [userId, storedToken, navigate]);

  return (
    <>
      {showEditProfileForm ? (
        <EditProfileForm
          id={userId}
          storedToken={storedToken}
          user={user}
          setShowEditProfile={setShowEditProfile}
          setUser={setUser}
        />
      ) : (
        <ProfileCard user={user} setShowEditProfile={setShowEditProfile} />
      )}
    </>
  );
}

export default ProfilePage;
