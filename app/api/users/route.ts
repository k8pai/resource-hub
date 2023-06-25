import prisma from '@/lib/prisma';
import { createUser, findAllUsers } from '@/lib/prisma/users';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const data = await prisma.user.findMany({});
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in server router');
		return NextResponse.json(error);
	}
}

export async function POST(req: Request) {
	try {
		const { name, email, createdAt } = await req.json();
		console.log('request data = ', name, email, createdAt);
		const data = await prisma.user.create({
			data: {
				name: name,
				email: email,
				createdAt: createdAt,
			},
		});
		console.log('data = ', data);
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in server router', error);
		return NextResponse.json(error);
	}
}
