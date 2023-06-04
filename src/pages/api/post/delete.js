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
      const postId = new ObjectId(req.body);

      let post = await db.collection('post').findOne({ _id: postId });
      let admin = await db
        .collection('user_cred')
        .findOne({ email: session.user.email });

      if (post.author == session.user.email || admin) {
        const postResult = await db
          .collection('post')
          .deleteOne({ _id: postId });
        const commentResult = await db
          .collection('comment')
          .deleteMany({ parent: postId });
        const likeResult = await db
          .collection('like')
          .deleteMany({ postid: postId });

        if (postResult.deletedCount === 1) {
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
