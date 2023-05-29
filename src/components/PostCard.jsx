export default function PostCard({ post: { title, content } }) {
  return (
    <div className='bg-white rounded-xl p-5 mb-2'>
      <h4 className='text-xl font-extrabold m-0'>{title}</h4>
      <p className='text-gray-600 mx-0 my-5'>{content}</p>
    </div>
  );
}
