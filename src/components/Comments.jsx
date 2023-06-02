'use client';

import { useEffect, useState } from 'react';

export default function Comments({ _id }) {
  const [content, setContent] = useState('');
  const [comments, setCommnets] = useState([]);
  console.log(comments);
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify({ content, _id }),
    });
  };
  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`) //
      .then((res) => res.json()) //
      .then((data) => setCommnets(data));
  }, []);
  return (
    <div>
      <div>
        {comments.length === 0
          ? '댓글이 없습니다.'
          : comments.map((comment, i) => <p key={i}>{comment.content}</p>)}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' />
        <button>댓글 작성</button>
      </form>
    </div>
  );
}
