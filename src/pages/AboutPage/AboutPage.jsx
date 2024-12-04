import "./AboutPage.css";
import teamData from "../../data/team.json";
import AboutCard from "../../components/AboutCard/AboutCard";

function AboutPage() {
  return (
    <section className="about-section">
      {teamData.map((member, index) => {
        return <AboutCard key={index} member={member} />;
      })}
    </section>
  );
}

export default AboutPage;
