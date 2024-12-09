import "./AboutPage.css";
import teamData from "../../data/team.json";
import AboutCard from "../../components/AboutCard/AboutCard";

function AboutPage() {
  return (
    <section className="about-section">
      <div className="title-section">
        <h2>MADE FOR STUDENTS BY STUDENTS</h2>
        <p>
          Welcome to IronHub, the ultimate forum for Ironhack students! This
          platform is designed to bring together students from Web Development,
          Data Analytics, and UX/UI courses. Share knowledge, connect with
          peers, and grow your skills through collaboration and discussion. Join
          us and make the most out of your Ironhack experience!{" "}
          <br/>
          <span id="about-span">Click on the images to find more about us!</span>
        </p>
      </div>
      {teamData.map((member, index) => {
        return <AboutCard key={index} member={member} />;
      })}
    </section>
  );
}

export default AboutPage;
