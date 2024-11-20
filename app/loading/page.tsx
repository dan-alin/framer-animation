import { motion } from 'motion/react';

export default function Loading() {
	return (
		<div className="grid  items-center justify-items-center h-full p-8 gap-16 sm:p-20 ">
			loading...
			<motion.svg
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 2 }}
				width="100"
				height="100"
				viewBox="0 0 100 100"
			>
				<motion.path
					d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
					stroke="black"
					strokeWidth="2"
					fill="transparent"
				/>
			</motion.svg>
		</div>
	);
}
