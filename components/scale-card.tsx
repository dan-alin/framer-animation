import { cn } from '@/utils/cn';
import { StarIcon, EllipsisVerticalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Chip from './chip';
import { useSnapshot } from 'valtio';
import { configStore } from '@/stores/config.store';
type ScaleCardProps = {
	id: number;
	desc: string;
	title: string;
	performance?: number;
	volatility?: number;
	risk?: number;
	progressive?: boolean;
	tipology?: string;
};

const ScaleCard = ({
	id,
	desc,
	title,
	performance,
	volatility,
	risk,
	tipology,
	progressive = false
}: ScaleCardProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const { showVolatility, showPerformance, showTipology } = useSnapshot(configStore);

	const cardRef = useRef<HTMLDivElement>(null);

	const navigate = useRouter();

	const handleExpand = () => {
		const card = cardRef.current;
		if (!card) return;

		card.blur();

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
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{
				opacity: 1,
				scale: 1
			}}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{
				duration: 0.5,
				scale: { delay: progressive ? 0.1 * id : 0 },
				opacity: { delay: progressive ? 0.1 * id : 0 }
			}}
			className={cn('min-h-20  w-full ')}
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
					height: { duration: isAnimating ? 0.5 : 0 },
					width: { duration: isAnimating ? 0.5 : 0 },
					translateX: { duration: isAnimating ? 0.5 : 0 },
					translateY: { duration: isAnimating ? 0.5 : 0 }
				}}
				onClick={handleExpand}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleExpand();
					}
				}}
				tabIndex={0}
				className={cn(
					'rounded-lg flex flex-col bg-white shadow-xl cursor-pointer h-full w-full focus:scale-105 focus:duration-200 focus:outline-none ',
					isAnimating && 'pointer-events-none bg-gray-100 transition-colors duration-500 '
				)}
				onAnimationComplete={handleAnimatioonEnd}
			>
				{!isAnimating && (
					<motion.h1
						className={cn(
							' uppercase rounded-t-lg w-full flex items-center justify-between  px-2 py-1 text-white bg-primary-dark '
						)}
					>
						{title}
					</motion.h1>
				)}

				<motion.div
					transition={{ duration: 0.7, delay: 0 }}
					className={cn(
						'text-sm p-2 text-gray-600 uppercase items-end h-full flex gap-4',
						isAnimating && 'text-2xl px-8 pt-8 pb-2  text-black'
					)}
				>
					{isAnimating && (
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.7 }}
						>
							<StarIcon className="fill-gray-300 stroke-none size-6 " />
						</motion.span>
					)}

					<div className="flex flex-col w-full   ">
						{!isAnimating && (
							<>
								<span className="mb-1">{desc}</span>
								{showTipology && <p className="text-xs">{tipology}</p>}
								{showPerformance && (
									<p className="text-xs">
										perf. <span className="font-semibold">{performance}%</span>
									</p>
								)}
								{showVolatility && (
									<div className="flex flex-row gap-4 text-xs">
										<p>
											vola. <span className="font-semibold">{volatility}%</span>
										</p>
										<p>
											risk. <span className="font-semibold">{risk}%</span>
										</p>
									</div>
								)}

								<div className="flex flex-row mt-2 items-center justify-between   ">
									<StarIcon className="fill-gray-300 stroke-none size-6" />
									<EllipsisVerticalIcon className="fill-gray-400 stroke-gray-400 size-4" />
								</div>
							</>
						)}
					</div>

					{isAnimating &&
						Array.from({ length: 3 }).map((_, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, translateY: -50 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ duration: 0.2, delay: i * 0.2 }}
							>
								<Chip key={i} />
							</motion.div>
						))}
				</motion.div>

				{isAnimating && (
					<motion.div
						initial={{ opacity: 0, translateX: -50 }}
						animate={{ opacity: 1, translateX: 0 }}
						transition={{ duration: 0.5, delay: 0 }}
						className={cn('text-sm px-8 text-gray-600 uppercase items-center flex gap-2 ')}
					>
						<Chip isCategory /> • 21/11/2024
					</motion.div>
				)}
			</motion.div>
		</motion.div>
	);
};

export default ScaleCard;
