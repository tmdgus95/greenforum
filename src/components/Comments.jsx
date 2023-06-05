'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

export default function Comments({ _id }) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [comments, setCommnets] = useState([]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (session == null) {
      alert('로그인해야 댓글 작성 가능합니다.');
      return;
    }

    if (content.trim().length == 0) {
      alert('공백은 안됩니다.');
      return;
    }

    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify({ content, _id }),
    })
      .then((res) => res.json()) //
      .then((data) => setCommnets(data));
  };
  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`) //
      .then((res) => res.json()) //
      .then((data) => setCommnets(data));
  }, []);
  return (
    <div>
      <div>
        <p className='text-lg mt-6'>댓글 {comments.length}</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type='text'
            placeholder='댓글 작성하기'
          />
          <button className='ml-4 px-4 py-3 rounded-md bg-slate-300'>
            댓글 작성
          </button>
        </form>
        {comments.length === 0
          ? '댓글이 없습니다.'
          : comments.map((comment, i) => (
              <CommentCard key={i} comment={comment} />
            ))}
      </div>
    </div>
  );
}
