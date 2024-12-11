import "./AboutCard.css"; 
import githubLogo from "../../assets/github-logo.svg";
import linkedinLogo from "../../assets/linkedin-logo.svg";

import { useState } from "react";

function AboutCard({ member }) {
  const { name, linkedin, github, description } = member;
  const [hideDescription, setHideDescription] = useState(true);

  return (
    <article className="about-card">
      <div
        className={`img-div ${
          hideDescription && name.toLowerCase().slice(0, 3)
        }`}
        onClick={() => {
          setHideDescription(!hideDescription);
        }}
      >
        <p className={`${hideDescription && "hide"}`}>{description}</p>
      </div>
      <h2>{name}</h2>
      <div className="about-descr-div">
        <a href={linkedin} target="_blank">
          <img src={linkedinLogo} alt="linkedin logo" className="social-logo" />
        </a>
        <a href={github} target="_blank">
          <img src={githubLogo} alt="github logo" className="social-logo" />
        </a>
      </div>
    </article>
  );
}

export default AboutCard;
