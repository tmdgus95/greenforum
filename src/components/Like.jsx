'use client';

import { useEffect, useState } from 'react';

export default function Like({ _id }) {
  const [likes, setLikes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    fetch('/api/like/update', {
      method: 'POST',
      body: _id,
    })
      .then((res) => res.json()) //
      .then((data) => setLikes(data.likepeople));
  };

  useEffect(() => {
    fetch(`/api/like/list?id=${_id}`) //
      .then((res) => res.json()) //
      .then((data) => {
        setLikes(data.likepeople);
      });
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button onClick={handleClick}>
        {likes.length === 0 ? '🤍' : '❤️'} {likes.length}
      </button>
      {isHovered && likes.map((people, i) => <p key={i}>{people[1]}❤️</p>)}
    </div>
  );
}
