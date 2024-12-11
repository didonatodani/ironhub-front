import "./HomePage.css";
import heroGif from "../../assets/HeroGif.gif";

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-container">
      <img id="gif" src={heroGif} alt="gif on students working on computers" />
      <section className="description-container">
        <article className="description-title">
          <h1>IronHub </h1>
          <h2>Your Digital Campus Forum</h2>
        </article>
        <p>
          IronHub is where Ironhackers connect, share, and collaborate. Discover
          peer posts, manage your own, and stay engaged with your courses. Sign
          up or log in to start exploring today!
        </p>
        <h3 className="students-made">Made for Students by Students ❤️</h3>
        <Link to={"/about"}>
          <button id="home-button" className="primary-button">
            Discover Our Story
          </button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
