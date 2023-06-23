'use client';

import React, { useState } from 'react';

const Header: React.FC = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [popupOpen, setPopupOpen] = useState(false);

	const handlePopupToggle = () => {
		setPopupOpen(!popupOpen);
	};

	const handleLoginChange = () => {
		setLoggedIn((ref) => !ref);
	};

	const handleLogout = () => {
		// Implement your logout logic here
		setLoggedIn(false);
		setPopupOpen(false);
	};

	return (
		<header className="flex items-center justify-between w-full p-4 bg-[#181818] shadow-md">
			<div className="ml-4">
				{/* <img src="logo.png" alt="Logo" className="h-8" /> */}
				<span className="text-xl font-bold font-sans">
					Resource Hub
				</span>
			</div>
			<span className="flex-1"></span>
			{loggedIn ? (
				<div className="relative">
					<button
						className="p-2 rounded-md bg-[#121212] hover:bg-[#242424] transition-all duration-200 ease-in shadow-md focus:outline-none"
						onClick={handlePopupToggle}
					>
						<img src="profile-icon.png" alt="DP" className="h-6" />
					</button>
					{popupOpen && (
						<div className="absolute right-0 mt-2 py-2 rounded-md bg-[#181818] hover:bg-[#242424] transition-all duration-200 ease-in shadow-lg">
							<button
								className="block w-full px-4 py-2 text-left"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			) : (
				<button
					onClick={handleLoginChange}
					className="px-4 py-2 rounded-md bg-[#242424] hover:bg-[#202020] transition-all duration-200 ease-in shadow-md"
				>
					Login
				</button>
			)}
		</header>
	);
};

export default Header;
