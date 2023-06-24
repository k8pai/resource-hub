import prisma from '@/lib/prisma';
import { createUser, findAllUsers } from '@/lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const data = await prisma.user.findMany({
			include: {
				profile: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in server router');
		return NextResponse.json(error);
	}
}

export async function POST(req: Request) {
	try {
		const { profile, email, password, createdAt } = await req.json();
		console.log('request data = ', profile, email, password, createdAt);
		const data = await prisma.user.create({
			data: {
				email: email,
				password: password,
				createdAt: createdAt,
				profile: {
					create: profile,
				},
			},
			include: {
				profile: true,
			},
		});
		console.log('data = ', data);
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in server router', error);
		return NextResponse.json(error);
	}

	return NextResponse.json({ status: 'OK' });
}
