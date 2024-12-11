import "./ProfileCard.css";

function ProfileCard({ user, setShowEditProfile }) {
  const {
    name,
    picture,
    course,
    createdAt,
    email,
    schedule,
    languages,
    linkedin,
  } = user;

  if (!user) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");

  return (
    <div className="user-info">
      <div className="heading-profile">
        <h2>{name}</h2>
        <img src={picture} alt="user-profile" />
        <span>{course}</span>
        <small>User since: {formattedDate}</small>
      </div>
      <div className="profile-details">
        <button
          className="primary-button"
          onClick={() => setShowEditProfile(true)}
        >
          Edit Profile
        </button>
        <p>
          Name: <span>{name}</span>
        </p>
        <p>
          Email: <span>{email}</span>
        </p>
        <p>
          Course-type: <span>{schedule}</span>
        </p>
        {languages && (
          <p>
            Languages: <span>{languages}</span>
          </p>
        )}
        {linkedin && (
          <p>
            Linkedin: <a href={linkedin} target="_blank" id="linkedin-link">{linkedin}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
