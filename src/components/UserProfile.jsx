export default function UserProfile({
  session: {
    user: { name },
  },
}) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}
