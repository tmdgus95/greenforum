'use client';

import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import UserProfile from './UserProfile';

export default function Navbar({ session }) {
  console.log(session);
  return (
    <div className='flex items-center bg-white p-5'>
      <Link className='mr-3 font-extrabold' href={'/'}>
        Greenforum
      </Link>
      <Link className='mr-3' href={'/list'}>
        List
      </Link>
      <Link className='mr-3' href={'/write'}>
        Write
      </Link>
      {session == null ? (
        <button onClick={signIn}>Login</button>
      ) : (
        <div className='flex gap-4'>
          <UserProfile session={session} />
          <button onClick={signOut}>Logout</button>
        </div>
      )}
    </div>
  );
}
