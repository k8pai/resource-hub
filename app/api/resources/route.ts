import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Context, ContextType } from 'react';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	try {
		console.log('session => ', session, req);
		const data = await prisma.resource.findMany({});
		console.log('data = ', data);
		return NextResponse.json(data);
	} catch (error) {
		console.log('error in api/resources/route.ts', error);
		return NextResponse.json(error);
	}
}

export async function POST(req: Request, res: NextApiResponse) {
	const session = await getServerSession(authOptions);
	try {
		const { title, description, website, docs, createdBy, tags } =
			await req.json();
		if (!session) {
			console.log('not logged in');
			return NextResponse.json({ error: 'you are not authorized' });
		}
		let user;
		if (session?.user?.email)
			user = await prisma.user.findUnique({
				where: { email: session?.user?.email },
			});

		if (!user) {
			console.log('no user found');
			return NextResponse.json({ error: 'you are not authorized' });
		}

		const data = await prisma.resource.create({
			data: {
				title: title,
				description: description,
				docs: docs,
				website: website,
				likeCount: 0,
				createdById: user.id,
				tags: {
					create: tags.map((item: string) => ({
						name: item,
					})),
				},
				likedBy: undefined,
				savedBy: undefined,
			},
			include: {
				createdBy: true,
				tags: true,
				likedBy: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.log('error inside router resources', error);
		return NextResponse.json(error);
	}
}

export async function PUT(req: Request) {
	try {
		const requestData = await req.json();
		console.log('requestData => ', requestData);
		const data = await prisma.likedResource.create({
			data: {
				userId: requestData.userId,
				resourceId: requestData.resourceId,
			},
		});
		console.log('data from /api/resources/router.ts', data);
		return NextResponse.json(data);
	} catch (error) {
		console.log('error inside api/resources/router.ts', error);
		return NextResponse.json(error);
	}
}
