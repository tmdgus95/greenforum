'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('nomal');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      alert('빈칸으로 입력한 란이 있습니다.');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        router.push('/');
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='name'
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name='email'
          type='text'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name='password'
          type='password'
          placeholder='비번'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
}
