'use client';

import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import UserProfile from './UserProfile';
import Image from 'next/image';

export default function Navbar({ session }) {
  return (
    <div className='flex items-center bg-white p-5'>
      <div className='flex items-center gap-2 duration-300 hover:scale-110'>
        <Image src={'/images/logo.png'} width={40} height={40} alt='로고' />
        <Link className='mr-3 font-extrabold' href={'/'}>
          Greenforum
        </Link>
      </div>

      <Link className='mr-3 duration-300 hover:scale-110' href={'/list'}>
        List
      </Link>
      <Link className='mr-3 duration-300 hover:scale-110' href={'/write'}>
        Write
      </Link>
      {session == null ? (
        <>
          <Link
            className='mr-3 duration-300 hover:scale-110'
            href={'/register'}
          >
            Register
          </Link>
          <button onClick={signIn} className='duration-300 hover:scale-110'>
            Login
          </button>
        </>
      ) : (
        <div className='flex gap-4 '>
          <UserProfile session={session} />
          <button onClick={signOut} className='duration-300 hover:scale-110'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
