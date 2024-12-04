function AboutCard({ member }) {
  const { name, linkedin, github, description } = member;
  return (
    <article className="about-card">
      <h2>{name}</h2>
      <p>{description}</p>
    </article>
  );
}

export default AboutCard;
