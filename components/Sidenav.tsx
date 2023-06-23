'use client';

import { linkSync } from 'fs';
import Link from 'next/link';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidenav() {
	const path = usePathname();
	const links = [
		{ name: 'Account', link: '/account' },
		{ name: 'Feed', link: '/' },
		{ name: 'Saved', link: '/saved' },
		// { name: 'Search', link: '/search' },
		{ name: 'Tags', link: '/tags' },
	];

	console.log('router = ', path, typeof path);

	return (
		<div className="my-8 mx-2 sticky top-20 h-full min-w-[200px] box-border">
			{links.map(({ name, link }) => (
				<Link
					key={link}
					href={link}
					className={`block py-2 px-8 tracking-widest font-semibold rounded-md hover:bg-[#242424] transition-all duration-200 ease-in ${
						path == link ? 'bg-[#fff]' : null
					}]`}
				>
					{name}
				</Link>
			))}
		</div>
	);
}
