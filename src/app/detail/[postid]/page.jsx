import Comments from '@/components/Comments';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Detail({ params: { postid } }) {
  let db = (await connectDB).db('forum');
  let post = await db.collection('post').findOne({ _id: new ObjectId(postid) });
  const { title, content, imgurl } = post;
  return (
    <section>
      <h4>상세 페이지</h4>
      <h4>{title}</h4>
      <p>{content}</p>
      <img src={imgurl} alt={title} width={500} height={500} />
      <Comments _id={postid} />
    </section>
  );
}
