import PostCard from '@/components/PostCard';
import data from '@/lib/data';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="h-full space-y-6 bg-[#141414] text-[#ECEFF1] max-w-2xl mx-auto">
			{data?.map((el, elXid) => (
				<PostCard key={elXid} postData={el} />
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
