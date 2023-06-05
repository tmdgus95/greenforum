'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function Write() {
  const router = useRouter();
  const [imgurl, setImgurl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    alert('로그인이 필요합니다.');
    router.push('/');
  }

  const handleChange = async (e) => {
    const { files } = e.target;
    let file = files && files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });

    const responseData = await response.json();
    const url = responseData.url;
    setImgurl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      title,
      content,
      imgurl,
    });
    const res = await fetch('/api/post/new', {
      method: 'POST',
      body,
    });
    const data = await res.json();
    if (data.redirect) {
      router.push(data.redirect);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='p-5 flex flex-col'>
      <h4 className='text-2xl mb-6'>글작성</h4>
      <form className='flex flex-col' onSubmit={handleSubmit} method='POST'>
        <input
          className='p-3 mb-3'
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='글제목'
        />
        <input
          className='p-3 mb-3'
          type='text'
          onChange={(e) => setContent(e.target.value)}
          placeholder='글내용'
        />

        <input
          type='file'
          accept='image/*'
          onChange={handleChange}
          ref={fileInputRef}
          className='hidden'
        />
        {imgurl && <img src={imgurl} alt='미리보기' width={300} />}
        <button
          type='button'
          className='mt-4 px-4 py-3 rounded-md bg-slate-300'
          onClick={handleButtonClick}
        >
          파일 선택
        </button>
        <button className='mt-4 px-4 py-3 rounded-md bg-slate-300'>작성</button>
      </form>
    </div>
  );
}
