export default function UserProfile({
  session: {
    user: { image, name },
  },
}) {
  return (
    <div>
      <img className='rounded-full' src={image} alt={name} width={50} />
      <p>{name}</p>
    </div>
  );
}
