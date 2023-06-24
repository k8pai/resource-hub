import { createUser } from '@/lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const user = await req.json();
		console.log('user = ', user);
		const { data, error } = await createUser(user);
		if (error) throw new Error('Error thrown');
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in server router');
	}

	return NextResponse.json({ status: 'OK' });
}
