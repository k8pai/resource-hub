import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const data = await prisma.resource.findMany({});
		console.log('data = ', data);
		return NextResponse.json(data);
	} catch (error) {
		console.log('error = ', error);
		return NextResponse.json(error);
	}
}

export async function POST(req: Request) {
	try {
		const { title, description, website, docs, createdBy, tags } =
			await req.json();
		const data = await prisma.resource.create({
			data: {
				title: title,
				description: description,
				docs: docs,
				website: website,
				likeCount: 0,
				createdBy: {
					connect: {
						id: createdBy || '6496a0e8553393234e5e8e7d',
					},
				},
				tags: {
					create: tags.map((item: string) => ({
						name: item,
					})),
				},
			},
			include: {
				createdBy: true,
				tags: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.log('error inside router resources', error);
		return NextResponse.json(error);
	}
}
