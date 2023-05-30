import PostCard from '@/components/PostCard';
import { connectDB } from '@/util/database';

export const dynamic = 'force-dynamic';

export default async function List() {
  let db = (await connectDB).db('forum');
  let posts = await db.collection('post').find().toArray();
  posts = posts.map((post) => {
    post._id = post._id.toString();
    return { ...post, _id: post._id.toString() };
  });
  return (
    <div className='bg-slate-50 p-3'>
      {posts.map((post, i) => (
        <PostCard key={i} post={post}></PostCard>
      ))}
    </div>
  );
}
