import { cn } from '@/utils/cn';
import { StarIcon, EllipsisVerticalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
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
	onClick?: (e: number) => void;
	inline?: boolean;
};

const ScaleCard = ({
	id,
	desc,
	title,
	performance,
	volatility,
	risk,
	tipology,
	onClick = () => null,
	progressive = false,
	inline = false
}: ScaleCardProps) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const { showVolatility, showPerformance, showTipology } = useSnapshot(configStore);

	const cardRef = useRef<HTMLDivElement>(null);

	const handleExpand = () => {
		const card = cardRef.current;
		if (!card) return;

		card.blur();

		setIsAnimating(true);
	};

	return inline ? (
		<div
			onClick={(e) => {
				e.stopPropagation();
				onClick(id);
			}}
			className="flex items-center w-full  gap-2 px-2"
		>
			<div className="flex items-center  gap-2 w-full">
				<span className=" flex aspect-square size-4 bg-primary-dark rounded-sm" />
				<p>{desc}</p>
			</div>

			<span className="justify-self-end font-bold"> {performance}% </span>
		</div>
	) : (
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
			onClick={() => onClick(id)}
		>
			<motion.div
				ref={cardRef}
				onClick={handleExpand}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleExpand();
					}
				}}
				tabIndex={0}
				className={cn(
					'rounded-lg flex flex-col bg-white shadow-xl cursor-pointer h-full w-full   focus:outline-none focus:ring-1 focus:ring-primary-dark',
					isAnimating && 'pointer-events-none bg-gray-100 transition-colors duration-500 '
				)}
			>
				<motion.h1
					className={cn(
						' uppercase rounded-t-lg w-full flex items-center justify-between  px-2 py-1 text-white bg-primary-dark '
					)}
				>
					{title}
				</motion.h1>

				<motion.div
					transition={{ duration: 0.7, delay: 0 }}
					className={cn('text-sm p-2 text-gray-600 uppercase items-end h-full flex gap-4')}
				>
					<div className="flex flex-col w-full   ">
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
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default ScaleCard;
