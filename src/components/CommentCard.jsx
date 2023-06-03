export default function CommentCard({ comment: { author, content, name } }) {
  return (
    <div>
      <p>{content}</p>
      <p>작성자 : {name}</p>
    </div>
  );
}
