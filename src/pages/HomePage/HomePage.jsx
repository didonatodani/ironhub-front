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
        <article className="description-title">
          <h1>IronHub </h1>
          <h2>Your Digital Campus Forum</h2>
        </article>
        <p>
          IronHub is where Ironhack students connect, share, and collaborate.
          Discover peer posts, manage your own, and stay engaged with your
          courses. Sign up or log in to start exploring today!
        </p>
        <p>Made for students by students.</p>
        <button id="general-button" onClick={handleNavigate}>
          Discover Our Story.
        </button>
      </section>
    </div>
  );
}

export default HomePage;
