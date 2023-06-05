import Banner from '@/components/Banner';
import PostCard from '@/components/PostCard';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';

export default async function Home() {
  let db = (await connectDB).db('forum');
  let posts = await db.collection('post').find().toArray();
  posts = posts.map((post) => {
    post._id = post._id.toString();
    return { ...post, _id: post._id.toString() };
  });
  let session = await getServerSession(authOptions);
  return (
    <main>
      <Banner />
      <div className='bg-slate-50 p-3'>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} session={session}></PostCard>
        ))}
      </div>
    </main>
  );
}
