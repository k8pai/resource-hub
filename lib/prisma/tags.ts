import prisma from '.';

export const findAllTags = async () => {
	try {
		const data = await prisma.tag.findMany({});
		console.log('data from /lib/prisma/tags.ts', data);
		return { data };
	} catch (error) {
		console.log('error occured in lib/prisma/tags,', error);
		return { error };
	}
};

export const findTag = async (name: string) => {
	try {
		const data = await prisma.tag.findMany({
			where: {
				name: {
					startsWith: name,
				},
			},
		});
		return { data };
	} catch (error) {
		console.log('error occured in lib/prisma/tags,', error);
		return { error };
	}
};
