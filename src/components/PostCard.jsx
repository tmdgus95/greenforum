import Link from 'next/link';

export default function PostCard({ post: { title, content, _id } }) {
  return (
    <div className='bg-white rounded-xl p-5 mb-2'>
      <Link href={`/detail/${_id}`}>
        <h4 className='text-xl font-extrabold m-0'>{title}</h4>
      </Link>

      <p className='text-gray-600 mx-0 my-5'>{content}</p>
    </div>
  );
}
