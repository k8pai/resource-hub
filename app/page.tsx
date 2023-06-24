import PostCard from '@/components/PostCard';
import { findAllResource } from '@/lib/prisma/resources';
import { findAllTags } from '@/lib/prisma/tags';
// import data from '@/lib/data';
import { createUser, findAllUsers } from '@/lib/prisma/users';
import { Resource, Tag, User, UserPayload } from '@prisma/client';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

export default async function Home() {
	let posts: Resource[] | any = [],
		tags: Tag[] | undefined = [];
	try {
		const { data: res, error: err } = await findAllResource();
		posts = res;
		const { data, error } = await findAllTags();
		if (error) throw new Error('Error in tags/page.tsx');
		tags = data;
	} catch (error) {
		console.log('catched in /app/page.tsx', error);
	}

	return (
		<main className="h-full space-y-6 bg-[#141414] text-[#ECEFF1] max-w-2xl mx-auto">
			<section>
				<div className={`relative rounded-lg overflow-hidden`}>
					<input
						name="tagName"
						placeholder="tags..."
						autoComplete="off"
						className="pl-4 pr-10 py-3 rounded-lg backdrop-blur-sm bg-[#222222] focus:outline-none w-full tracking-wider font-semibold"
					/>
					<button className={`absolute right-1 inset-y-0 p-2`}>
						<FiSearch />
					</button>
				</div>
			</section>
			<section>
				<div className="flex flex-wrap items-center">
					{tags?.map((el: Tag) => (
						<div
							key={el.id}
							className="rounded-md w-fit bg-[#202020] tracking-wider font-semibold flex items-center space-x-px text-white text-xs px-2 py-1 m-1"
						>
							<span>#</span>
							<span>{el?.name}</span>
						</div>
					))}
				</div>
			</section>
			{posts?.map((el: any, elXid: number) => (
				<PostCard
					key={elXid}
					postData={el}
					createdBy={el.createdBy}
					tags={el.tags}
				/>
			))}
		</main>
	);
}

// Theme 1:

// Background: #232323
// Text: #FFFFFF
// Accent: #FF9800
// Link: #03A9F4
// Button: #4CAF50
// Error: #FF5722
// Theme 2:

// Background: #121212
// Text: #E0E0E0
// Accent: #FF4081
// Link: #00BCD4
// Button: #9C27B0
// Error: #F44336
// Theme 3:

// Background: #1F1F1F
// Text: #D4D4D4
// Accent: #03DAC6
// Link: #FFEB3B
// Button: #2196F3
// Error: #FF5252
// Theme 4:

// Background: #141414
// Text: #ECEFF1
// Accent: #FFC107
// Link: #FF5722
// Button: #3F51B5
// Error: #F44336
