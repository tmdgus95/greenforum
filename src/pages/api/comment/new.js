import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (req.method == 'POST') {
    req.body = JSON.parse(req.body);
    let commentData = {
      content: req.body.content,
      parent: new ObjectId(req.body._id),
      author: session.user.email,
    };
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').insertOne(commentData);
    res.status(200).json('저장완료');
  }
}
