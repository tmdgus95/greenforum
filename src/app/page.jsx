import { connectDB } from '@/util/database';

export default async function Home() {
  let db = (await connectDB).db('forum');
  let posts = await db.collection('post').find().toArray();

  return <main></main>;
}
