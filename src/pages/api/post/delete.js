import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      let session = await getServerSession(req, res, authOptions);
      let db = (await connectDB).db('forum');
      let post = await db
        .collection('post')
        .findOne({ _id: new ObjectId(req.body) });

      if (post.author == session.user.email) {
        let result = await db
          .collection('post')
          .deleteOne({ _id: new ObjectId(req.body) });

        if (result.deletedCount === 1) {
          res.status(200).json('삭제완료');
        } else {
          res.status(500).json('삭제 실패');
        }
      }
    } catch {
      res.status(500).json('서버 오류');
    }
  }
}
