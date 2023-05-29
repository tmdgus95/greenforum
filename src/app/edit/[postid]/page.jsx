import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Edit({ params: { postid } }) {
  let db = (await connectDB).db('forum');
  let post = await db.collection('post').findOne({ _id: new ObjectId(postid) });
  const { title, content, _id } = post;

  return (
    <div className='p-5 flex flex-col'>
      <h4 className='text-2xl mb-6'>수정 페이지</h4>
      <form className='flex flex-col' action='/api/post/edit' method='POST'>
        <input
          className='p-3 mb-3'
          type='text'
          name='title'
          defaultValue={title}
        />
        <input
          className='p-3 mb-3'
          type='text'
          name='content'
          defaultValue={content}
        />
        <input
          className='p-3 mb-3 hidden'
          type='text'
          name='_id'
          defaultValue={_id.toString()}
        />
        <button className='px-4 py-3 rounded-md bg-slate-300'>수정</button>
      </form>
    </div>
  );
}
