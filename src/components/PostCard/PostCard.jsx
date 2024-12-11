import "./PostCard.css";

function PostCard({ post }) {
  const { created, description, course, link, name, picture, title } = post;
  const formattedDate = new Date(created).toLocaleDateString("en-GB");

  return (
    <article>
      <div className="post-card-header">
        <span>{name?.name}</span>
        <span>{formattedDate}</span>
      </div>
        <span>{course}</span>
      <h2>{title}</h2>
    </article>
  );
}

export default PostCard;
