import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method == 'POST') {
    const { email, password } = req.body;
    let db = (await connectDB).db('forum');
    const existingUser = await db.collection('user_cred').findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: '등록된 이메일입니다.' });
      return;
    }
    let hash = await bcrypt.hash(password, 10);
    req.body.password = hash;
    let user = await db.collection('user_cred').insertOne(req.body);

    res.redirect(302, '/');
  }
}
