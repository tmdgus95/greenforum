import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_PW,
    }),
  ],
  secret: process.env.NEXTAUTH_JWT_PW,
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
