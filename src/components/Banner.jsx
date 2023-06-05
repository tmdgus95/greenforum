export default function Banner() {
  return (
    <section className='h-96 bg-green-900 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-80'></div>
      <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl'>너와 나의 꿈을 그린</h2>
        <p className='text-2xl'>'우리'여서 행복했던 순간</p>
      </div>
    </section>
  );
}
