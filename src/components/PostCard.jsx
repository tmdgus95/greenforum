'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PostCard({ post: { title, content, _id } }) {
  const [hidden, setHidden] = useState(false);
  const handleDelete = () => {
    fetch('/api/post/delete', {
      method: 'POST',
      body: _id,
    }).then(() => setHidden(true));
  };
  return (
    <div className={`bg-white rounded-xl p-5 mb-2 ${hidden && 'hidden'}`}>
      <Link href={`/detail/${_id}`}>
        <h4 className='text-xl font-extrabold m-0'>{title}</h4>
      </Link>
      <Link href={`/edit/${_id}`}>🪄</Link>
      <span onClick={handleDelete}>🗑️</span>
      <p className='text-gray-600 mx-0 my-5'>{content}</p>
    </div>
  );
}