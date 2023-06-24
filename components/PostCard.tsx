'use client';

import { Resource, Tag, TagPayload, User, UserPayload } from '@prisma/client';
import { UserArgs } from '@prisma/client/runtime';
import Link from 'next/link';
import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { CiBookmarkPlus, CiBookmarkCheck } from 'react-icons/ci';
import { PiShareFatFill } from 'react-icons/pi';
import { SiDocsdotrs } from 'react-icons/si';
import { SlGlobe } from 'react-icons/sl';

export default function PostCard({
	postData: { title, description, docs, website, likeCount },
	createdBy,
	tags,
}: {
	postData: Resource;
	createdBy: User;
	tags: Tag[];
}) {
	const [state, setState] = useState({
		isLiked: false,
		isSaved: false,
		likeCount: 1345,
		shareCount: 123,
	});
	const handleLike = () => {
		setState((ref) => ({
			...ref,
			isLiked: !ref.isLiked,
			likeCount: ref.isLiked ? ref.likeCount - 1 : ref.likeCount + 1,
		}));
	};

	const handleSave = () => {
		setState((ref) => ({
			...ref,
			isSaved: !ref.isSaved,
		}));
	};

	const handleShare = () => {
		setState((ref) => ({
			...ref,
			shareCount: ref.shareCount + 1,
		}));
	};

	return (
		<div className="bg-[#202020] rounded-lg shadow-md w-full p-4">
			<div className=" mb-2">
				<h2 className="text-xl font-bold">{title}</h2>
				<code className="text-xs tracking-wide">
					{createdBy.email ? (
						<Link href={`/account/${createdBy.email}`}>
							{createdBy.email}
						</Link>
					) : (
						<span>_k8pai</span>
					)}
				</code>
			</div>
			<p className="text-gray-300 mb-4">{description}</p>
			<div className="flex flex-wrap">
				{tags?.map((el: Tag) => (
					<div
						key={el.id}
						className="rounded-md bg-[#181818] tracking-wider font-semibold flex items-center space-x-px text-white text-xs px-2 py-1 mx-1"
					>
						<span>#</span>
						<span>{el?.name}</span>
					</div>
				))}
			</div>
			<div className="w-full flex items-center justify-between py-2">
				<span className="ml-1 text-xs">{likeCount}</span>
				{/* <div> */}
				{/* <span className="ml-1 text-xs"> saved</span> */}
				<span className="ml-1 text-xs">{state.shareCount}</span>
				{/* </div> */}
			</div>
			<hr />
			<div className="w-full flex items-center justify-center mt-2">
				<button
					onClick={handleLike}
					className="flex-1 w-full p-2 flex justify-center rounded-md transition duration-200 ease-in text-gray-400 hover:bg-[#181818] hover:shadow-md hover:text-gray-300 mx-1"
				>
					{state.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
					<span className="ml-2 text-xs">Like</span>
				</button>
				<button
					onClick={handleSave}
					className="flex-1 w-full p-2 flex justify-center rounded-md transition duration-200 ease-in text-gray-400 hover:bg-[#181818] hover:shadow-md hover:text-gray-300 mx-1"
				>
					{state.isSaved ? <CiBookmarkCheck /> : <CiBookmarkPlus />}
					<span className="ml-2 text-xs">Save</span>
				</button>
				<button
					onClick={handleShare}
					className="flex-1 w-full p-2 flex justify-center rounded-md transition duration-200 ease-in text-gray-400 hover:bg-[#181818] hover:shadow-md hover:text-gray-300 mx-1"
				>
					<PiShareFatFill />
					<span className="ml-2 text-xs">Share</span>
				</button>
				{docs && (
					<Link
						href={docs}
						className="flex-1 w-full p-2 flex justify-center rounded-md transition duration-200 ease-in text-gray-400 hover:bg-[#181818] hover:shadow-md hover:text-gray-300 mx-1"
					>
						<SiDocsdotrs />
						<span className="ml-2 text-xs">Docs</span>
					</Link>
				)}
				{website && (
					<Link
						href={website}
						className="flex-1 w-full p-2 flex justify-center rounded-md transition duration-200 ease-in text-gray-400 hover:bg-[#181818] hover:shadow-md hover:text-gray-300 mx-1"
					>
						<SlGlobe />
						<span className="ml-2 text-xs">Site</span>
					</Link>
				)}
			</div>
		</div>
	);
}
