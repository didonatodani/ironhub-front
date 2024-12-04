import "./PostCard.css";

function PostCard({ post }) {
  const { created, description, course, likes, link, name, picture, title } = post;

  const formattedDate = new Date(created).toLocaleDateString("en-GB");

  return (
    <article>
      <div className="post-card-header">
        <span>{name?.name}</span>
        <span>{formattedDate}</span>
      </div>
        <span>{course?.course}</span>
      <h2>{title}</h2>
      <p id="post-card-description">{description}</p>
    </article>
  );
}

export default PostCard;
