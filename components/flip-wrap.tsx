import { flipWrapStore } from '@/stores/current-card.store';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

type MotionLineCardProps = {
	id: number;
	front: ReactNode;
	onAnimationEnd?: () => void;
	scale?: number;
};

const FlipWrap = ({ id, front, onAnimationEnd, scale = 7 }: MotionLineCardProps) => {
	const { flippedId, isAnimating } = useSnapshot(flipWrapStore);
	const cardRef = useRef<HTMLDivElement>(null);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const openCard = () => {
		flipWrapStore.isAnimating = true;
		flipWrapStore.flippedId = id;
		flipWrapStore.triggered = true;
		reposition();
	};

	const isCurrent = flippedId === id;

	const reposition = () => {
		const card = cardRef.current;
		if (!card) return;
		const { top, left, width, height } = card.getBoundingClientRect();

		const x = window.innerWidth / 2 - width / 2 - left;
		const y = window.innerHeight / 2 - height / 2 - top;

		setX(x);
		setY(y);
	};

	return (
		<AnimatePresence>
			<motion.div
				ref={cardRef}
				className={cn(
					' bg-white rounded-lg shadow-lg  w-full h-[200px]  transform-3d cursor-pointer',
					isAnimating && 'pointer-events-none'
				)}
				initial={{
					rotateY: 0,
					translateX: 0,
					translateY: 0,
					zIndex: 1,
					scale: 0.8,
					opacity: 0
				}}
				animate={{
					rotateY: isCurrent ? 180 : 0,
					translateX: x,
					translateY: y,
					zIndex: isCurrent ? 10 : 1,
					scale: isCurrent ? scale : 1,
					opacity: 1,
					backgroundColor: isCurrent ? '#f3f4f6' : 'white'
				}}
				transition={{
					zIndex: isCurrent ? { delay: 0 } : { delay: 0.5 },
					scale: isCurrent && { delay: 0.4, duration: 0.5 },
					translateY: isCurrent && { delay: 0, duration: 0.3 },
					translateX: isCurrent && { delay: 0, duration: 0.3 },
					backgroundColor: { duration: 0.5, delay: 0.5 }
				}}
				exit={{
					rotateY: 0,
					translateX: 0,
					translateY: 0,
					zIndex: 1,
					scale: 0.8,
					opacity: 0
				}}
				onAnimationComplete={onAnimationEnd}
			>
				{/* FRONT */}
				<div className="absolute  backface-hidden h-full w-full" onClick={openCard}>
					{front}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default FlipWrap;
