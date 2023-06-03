import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      let session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json('로그인 먼저하세요');
        return;
      }

      let db = (await connectDB).db('forum');
      let post = await db
        .collection('post')
        .findOne({ _id: new ObjectId(req.body) });
      let admin = await db
        .collection('user_cred')
        .findOne({ email: session.user.email });

      if (post.author == session.user.email || admin) {
        let result = await db
          .collection('post')
          .deleteOne({ _id: new ObjectId(req.body) });

        if (result.deletedCount === 1) {
          res.status(200).json('삭제 완료');
        } else {
          res.status(500).json('삭제 실패');
        }
      } else {
        res.status(403).json('자신이 작성한 글만 삭제할 수 있어요.');
      }
    } catch {
      res.status(500).json('서버 오류');
    }
  }
}
