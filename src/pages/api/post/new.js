import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body = JSON.parse(req.body);
    req.body.author = session.user.email;
    req.body.name = session.user.name;
  }
  if (req.method == 'POST') {
    if (req.body.title == '') {
      return res.status(500).json('제목이 비어있습니다.');
    }
    if (req.body.content == '') {
      return res.status(500).json('내용이 비어있습니다.');
    }

    let db = (await connectDB).db('forum');
    let post = await db.collection('post').insertOne(req.body);
    return res.json({ redirect: '/' });
  }
}
