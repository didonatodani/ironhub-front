import "./HomePage.css";
import heroGif from "../../assets/HeroGif.gif";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/about");

  return (
    <div className="homepage-container">
      <img id="gif" src={heroGif} alt="gif on students working on computers" />
      <section className="description-container">
        <h1>IronHub: Your Digital Campus Forum</h1>
        <p>
          IronHub is where Ironhack students connect, share, and collaborate.
          Discover peer posts, manage your own, and stay engaged with your
          courses. Sign up or log in to start exploring today!
        </p>
        <p>Made for students by students.</p>
        <button id="about-btn" onClick={handleNavigate}>
          Discover Our Story.
        </button>
      </section>
    </div>
  );
}

export default HomePage;
