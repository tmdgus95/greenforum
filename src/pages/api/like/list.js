import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  let db = (await connectDB).db('forum');
  let like = await db
    .collection('like')
    .findOne({ postid: new ObjectId(req.query.id) });
  res.status(200).json(like);
}
