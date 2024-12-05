import githubLogo from "../../assets/github-logo.svg"
import linkedinLogo from "../../assets/linkedin-logo.svg"
import "./AboutCard.css"

function AboutCard({ member }) {
  const { name, linkedin, github, description } = member;
  return (
    <article className="about-card">
      <div className={`img-div ${name.toLowerCase().slice(0,3)}`}></div>
      <h2>{name}</h2>
      <div className="about-descr-div">
        <p>{description}</p>
        <a href={linkedin}><img src={linkedinLogo} alt="linkedin logo" className="social-logo"/></a>
        <a href={github}><img src={githubLogo} alt="github logo" className="social-logo"/></a>
      </div>
    </article>
  );
}

export default AboutCard;
