import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (req.method === 'POST') {
    let db = (await connectDB).db('forum');
    let postid = new ObjectId(req.body);
    let likeData = {
      likepeople: [[session.user.email, session.user.name]],
    };

    let existingDoc = await db.collection('like').findOne({ postid });

    if (existingDoc) {
      if (
        existingDoc.likepeople.some(([email]) => email === session.user.email)
      ) {
        await db
          .collection('like')
          .updateOne(
            { _id: existingDoc._id },
            { $pull: { likepeople: [session.user.email, session.user.name] } }
          );
      } else {
        await db
          .collection('like')
          .updateOne(
            { _id: existingDoc._id },
            { $push: { likepeople: [session.user.email, session.user.name] } }
          );
      }
    } else {
      likeData.postid = postid;
      await db.collection('like').insertOne(likeData);
    }

    let updatedDoc = await db.collection('like').findOne({ postid });
    res.status(200).json(updatedDoc);
  }
}
