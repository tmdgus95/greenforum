import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='bg-white p-5'>
      <Link className='mr-3 font-extrabold' href={'/'}>
        Greenforum
      </Link>
      <Link className='mr-3' href={'/list'}>
        List
      </Link>
      <Link className='mr-3' href={'/write'}>
        Write
      </Link>
    </div>
  );
}
