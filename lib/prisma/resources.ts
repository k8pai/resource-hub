import prisma from '.';

export const findAllResource = async () => {
	try {
		const data = await prisma.resource.findMany({
			include: {
				createdBy: true,
				tags: true,
			},
		});
		return { data };
	} catch (error) {
		console.log('error = ', error);
		return { error };
	}
};
