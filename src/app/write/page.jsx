export default function Write() {
  return (
    <div className='p-5 flex flex-col'>
      <h4 className='text-2xl mb-6'>글작성</h4>
      <form className='flex flex-col' action='/api/post/new' method='POST'>
        <input
          className='p-3 mb-3'
          type='text'
          name='title'
          placeholder='글제목'
        />
        <input
          className='p-3 mb-3'
          type='text'
          name='content'
          placeholder='글내용'
        />
        <button className='px-4 py-3 rounded-md bg-slate-300'>작성</button>
      </form>
    </div>
  );
}
