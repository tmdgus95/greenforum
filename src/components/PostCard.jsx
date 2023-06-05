'use client';

import Link from 'next/link';
import { useState } from 'react';
import Like from './Like';

export default function PostCard({
  post: { title, content, _id, author, name, imgurl },
  session,
}) {
  const [hidden, setHidden] = useState(false);

  const handleDelete = () => {
    fetch('/api/post/delete', {
      method: 'POST',
      body: _id,
    })
      .then((response) => {
        if (response.ok) {
          setHidden(true);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          alert(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={`bg-white rounded-xl p-5 mb-2 ${hidden && 'hidden'}`}>
      <Link href={`/detail/${_id}`}>
        <h4 className='text-xl font-extrabold m-0'>
          {title}{' '}
          {imgurl ? <span>🖼️</span> : <span className='opacity-50'>🖼️</span>}
        </h4>
      </Link>
      <p>작성자 : {name}</p>
      <Like _id={_id} />
      {session?.user?.email == author && <Link href={`/edit/${_id}`}>🪄</Link>}
      <span onClick={handleDelete}>🗑️</span>
      <p className='text-gray-600 mx-0 my-5'>{content}</p>
    </div>
  );
}
