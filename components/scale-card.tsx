import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
type ScaleCardProps = {
	id: number;
	desc: string;
};

const ScaleCard = ({ id, desc }: ScaleCardProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const cardRef = useRef<HTMLDivElement>(null);

	const navigate = useRouter();

	const handleExpand = () => {
		const card = cardRef.current;
		if (!card) return;
		setIsAnimating(true);

		const { top, left } = card.getBoundingClientRect();
		const x = -left;
		const y = -top;

		setX(x);
		setY(y);
	};

	const handleAnimatioonEnd = () => {
		if (isAnimating) {
			navigate.push(`/${id + 1}`);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1
			}}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className=" h-32   w-[calc((100%-48px)*0.33)] "
		>
			<motion.div
				ref={cardRef}
				animate={{
					zIndex: isAnimating ? 100 : 1,
					height: isAnimating ? '100vh' : '100%',
					width: isAnimating ? '100vw' : '100%',
					translateX: isAnimating ? x : 0,
					translateY: isAnimating ? y : 0
				}}
				transition={{
					height: { duration: isAnimating ? 0.7 : 0 },
					width: { duration: isAnimating ? 0.7 : 0 },
					translateX: { duration: isAnimating ? 0.7 : 0 },
					translateY: { duration: isAnimating ? 0.7 : 0 }
				}}
				onClick={handleExpand}
				className={cn(
					'rounded-lg flex flex-col bg-white shadow-xl cursor-pointer h-full w-full ',
					isAnimating && 'pointer-events-none bg-gray-100 transition-colors duration-500 '
				)}
				onAnimationComplete={handleAnimatioonEnd}
			>
				{!isAnimating && (
					<motion.h1
						className={cn(' uppercase rounded-t-lg  px-2 py-1 text-white bg-primary-dark ')}
					>
						{desc}
					</motion.h1>
				)}

				<motion.p
					transition={{ duration: 0.7, delay: 0 }}
					className={cn(
						'text-sm p-2 text-gray-600 uppercase ',
						isAnimating && 'text-2xl px-8 py-9  text-black'
					)}
				>
					Card {id + 1}
				</motion.p>
			</motion.div>
		</motion.div>
	);
};

export default ScaleCard;
