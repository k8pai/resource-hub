import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import { DefaultAdapter } from 'next-auth/adapters';

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as DefaultAdapter,
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET as string,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
