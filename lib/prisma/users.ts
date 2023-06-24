import prisma from '.';

export const findAllUsers = async () => {
	try {
		const data = await prisma.user.findMany({});
		console.log('user = ', data);
		return { data };
	} catch (error) {
		console.log(error);
		return { error };
	}
};

export const createUser = async (user) => {
	console.log('user in createUser function = ', user);
	try {
		const data = await prisma.user.create({ data: user });
		return { data };
	} catch (error) {
		console.log(error);
		return { error };
	}
};
