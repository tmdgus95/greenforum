import Comments from '@/components/Comments';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Detail({ params: { postid } }) {
  let db = (await connectDB).db('forum');
  let post = await db.collection('post').findOne({ _id: new ObjectId(postid) });
  const { title, content, name, imgurl } = post;
  return (
    <section className='ml-4'>
      <div>
        <h2 className='text-4xl'>{title}</h2>
        <h3 className='my-4'>작성자: {name}</h3>
      </div>
      <p>{content}</p>
      {imgurl && <img src={imgurl} alt={title} width={500} height={500} />}
      <Comments _id={postid} />
    </section>
  );
}
