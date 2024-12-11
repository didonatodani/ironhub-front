import "./PostCard.css";

function PostCard({ post }) {
  const { created, course, name, title } = post;
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
