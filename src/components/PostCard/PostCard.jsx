import "./PostCard.css";

function PostCard({ post }) {
  const { created, description, likes, link, name, picture, title } = post;

  const formattedDate = new Date(created).toLocaleDateString('en-GB');

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span>{name.name}</span>
        <span>{formattedDate}</span>
      </div>
      <h2>{title}</h2>
      <p id="post-card-description">{description}</p>
    </article>
  );
}

export default PostCard;
