import { connectDB } from '@/util/database';

export default async function Home() {
  let db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();
  console.log(result);
  console.log(1);
  return <main></main>;
}
