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
      <form className='flex flex-col p-4 text-xl gap-4' onSubmit={handleSubmit}>
        <input
          className='p-4 h-12'
          name='name'
          type='text'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='p-4 h-12'
          name='email'
          type='text'
          placeholder='이메일을 입력하세요'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='p-4 h-12'
          name='password'
          type='password'
          placeholder='비밀번호를 입력하세요'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='ml-4 px-4 py-3 rounded-md bg-slate-300'
          type='submit'
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
