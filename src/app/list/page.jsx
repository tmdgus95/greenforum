import PostCard from '@/components/PostCard';
import { connectDB } from '@/util/database';

export default async function List() {
  let db = (await connectDB).db('forum');
  let posts = await db.collection('post').find().toArray();

  return (
    <div className='bg-slate-50 p-10'>
      {posts.map((post, i) => (
        <PostCard key={i} post={post}></PostCard>
      ))}
    </div>
  );
}
