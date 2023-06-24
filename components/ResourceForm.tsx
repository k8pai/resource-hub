'use client';

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { IconContext } from 'react-icons';
import { MdAdd, MdClose, MdOutlineClear } from 'react-icons/md';
import { SiDiscord, SiGmail, SiWhatsapp } from 'react-icons/si';
import { TbSend } from 'react-icons/tb';

type form = {
	title: string;
	description: string;
	website: string;
	docs: string;
};

export default function ResourceForm() {
	const [state, setState] = useState<form>({
		title: '',
		description: '',
		website: '',
		docs: '',
	});

	const [tagVal, setTagVal] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);

	const handleChange = (event: FormEvent) => {
		const { name, value } = event.target as any;
		setState((ref) => ({ ...ref, [name]: value }));
	};

	const handleTagValChange = (event: FormEvent) => {
		const { value } = event.target as any;
		setTagVal(value);
	};

	const handleAddTag = () => {
		if (tags.length >= 10) {
			setTagVal('');
			return;
		}
		if (tagVal && tags.length < 10 && !tags.includes(tagVal)) {
			setTags((ref) => [...ref, tagVal]);
			setTagVal('');
		}
	};

	const removeTag = (el: string) => {
		setTags((ref) => ref.filter((item) => item !== el));
	};

	const handleSubmit = async (event: FormEvent) => {
		event?.preventDefault();
		try {
			const response = await fetch('/api/resources', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...state, tags }),
			});
			if (!response.ok) {
				// set sme kind of error and don't try anythng again.
				return;
			}
			setState({
				title: '',
				description: '',
				website: '',
				docs: '',
			});
			setTags([]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="aboutme mt-10">
			<form className="w-full max-w-xl mx-auto" onSubmit={handleSubmit}>
				<div className="relative mr-0 mb-5">
					<input
						className="appearance-none block w-full bg-[#181818] text-slate-300 border border-transparent rounded py-3 px-4 leading-tight focus:outline-none focus:border-[#4338ca] font-semibold tracking-wider"
						id="title"
						type="text"
						placeholder="Title"
						autoComplete="off"
						name="title"
						value={state.title}
						onChange={handleChange}
					/>
					{state.title && (
						<button
							className="absolute inset-y-0 right-0 mx-2"
							onClick={() =>
								setState((ref) => ({
									...ref,
									name: '',
								}))
							}
						>
							<IconContext.Provider
								value={{
									size: '1.2em',
									className: 'global-class-name',
								}}
							>
								<MdOutlineClear />
							</IconContext.Provider>
						</button>
					)}
				</div>
				<div className="relative ml-0 mb-5">
					<input
						className="appearance-none block w-full bg-[#181818] text-slate-300 border border-transparent rounded py-3 px-4 leading-tight focus:outline-none focus:border-[#4338ca] font-semibold tracking-wider"
						id="docs"
						type="text"
						name="docs"
						placeholder="Documentation link"
						autoComplete="nope"
						value={state.docs}
						onChange={handleChange}
					/>
					{state.docs && (
						<button
							className="absolute inset-y-0 right-0 mx-2"
							onClick={() =>
								setState((ref) => ({
									...ref,
									docs: '',
								}))
							}
						>
							<IconContext.Provider
								value={{
									size: '1.2em',
									className: 'global-class-name',
								}}
							>
								<MdOutlineClear />
							</IconContext.Provider>
						</button>
					)}
				</div>
				<div className="relative mr-0 mb-5">
					<input
						className="appearance-none block w-full bg-[#181818] text-slate-300 border border-transparent rounded py-3 px-4 leading-tight focus:outline-none focus:border-[#4338ca] font-semibold tracking-wider"
						id="website"
						type="text"
						placeholder="Website Link"
						autoComplete="off"
						name="website"
						value={state.website}
						onChange={handleChange}
					/>
					{state.website && (
						<button
							className="absolute inset-y-0 right-0 mx-2"
							onClick={() =>
								setState((ref) => ({
									...ref,
									name: '',
								}))
							}
						>
							<IconContext.Provider
								value={{
									size: '1.2em',
									className: 'global-class-name',
								}}
							>
								<MdOutlineClear />
							</IconContext.Provider>
						</button>
					)}
				</div>
				<div className="relative mr-0 mb-2">
					<input
						className="appearance-none block w-full bg-[#181818] text-slate-300 border border-transparent rounded py-3 px-4 leading-tight focus:outline-none focus:border-[#4338ca] font-semibold tracking-wider"
						id="tagVal"
						type="text"
						placeholder="tags"
						autoComplete="off"
						name="tagVal"
						value={tagVal}
						onChange={handleTagValChange}
					/>
					{tagVal && (
						<button
							className="absolute inset-y-0 right-0 mx-2"
							onClick={handleAddTag}
						>
							<IconContext.Provider
								value={{
									size: '1.2em',
									className: 'global-class-name',
								}}
							>
								<MdAdd />
							</IconContext.Provider>
						</button>
					)}
				</div>

				<div className=" mb-5">
					<div className="flex flex-wrap px-1 items-center justify-between text-sm font-semibold">
						<h1>Selected Tags</h1>
						<span
							className={`${
								tags.length === 10
									? 'text-red-500'
									: 'text-white'
							}`}
						>
							{10 - tags.length}
						</span>
					</div>
					{tags && tags.length ? (
						<div className="mt-2 flex flex-wrap items-center">
							{tags?.map((el: string, elXid: number) => (
								<div
									key={elXid}
									className="group relative flex mr-2 my-1 space-x-2"
								>
									<div className="w-fit bg-[#181818] rounded-md tracking-wider font-semibold flex items-center space-x-px text-white text-xs px-2 py-1">
										<span>#</span>
										<span>{el}</span>
									</div>
									<button
										onClick={() => removeTag(el)}
										className="absolute -right-2 inset-y-0 opacity-0 transition-all duration-100 p-1 bg-[#181818] rounded-full transform group-hover:opacity-100 -translate-y-2/4"
									>
										<MdClose />
									</button>
								</div>
							))}
						</div>
					) : null}
				</div>
				<div className="flex flex-wrap -mx-3 mb-4">
					<div className="w-full px-3">
						<textarea
							className="no-resize appearance-none block w-full bg-[#181818] text-slate-300 border border-transparent rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-[#4338ca]  font-semibold tracking-wider h-48 resize-none"
							id="description"
							name="description"
							placeholder={`Describe about the resource in brief.`}
							value={state.description}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between mb-4">
					<button
						className="shadow-md flex items-center space-x-2 tracking-wider transition-all bg-[#181818] hover:bg-[#202020] focus:shadow-outline focus:outline-none text-slate-200 font-semibold py-2 px-4 rounded-lg"
						type="submit"
					>
						<span>Send</span>
						<IconContext.Provider value={{ size: '1.2em' }}>
							<TbSend />
						</IconContext.Provider>
					</button>
				</div>
			</form>
		</div>
	);
}
