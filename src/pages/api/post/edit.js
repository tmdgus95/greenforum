import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    if (req.body.title == '') {
      return res.status(500).json('제목이 비어있습니다.');
    }
    if (req.body.content == '') {
      return res.status(500).json('내용이 비어있습니다.');
    }

    const { title, content, _id } = req.body;
    const updatedata = { title, content };

    let db = (await connectDB).db('forum');
    let post = await db
      .collection('post')
      .updateOne({ _id: new ObjectId(_id) }, { $set: updatedata });
    res.redirect(302, '/list');
  }
}
