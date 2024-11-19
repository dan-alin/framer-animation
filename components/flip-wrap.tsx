import { flipWrapStore } from '@/stores/current-card.store';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { ReactNode, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

type MotionLineCardProps = {
	id: number;
	front: ReactNode;
	onAnimationEnd?: () => void;
};

const FlipWrap = ({ id, front, onAnimationEnd }: MotionLineCardProps) => {
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
		<motion.div
			ref={cardRef}
			className={cn(
				' bg-white rounded-lg shadow-lg h-full w-full   transform-3d cursor-pointer',
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
				zIndex: isCurrent ? 100 : 1,
				scale: isCurrent ? 7 : 1,
				opacity: 1
			}}
			transition={{
				zIndex: isCurrent ? { delay: 0 } : { delay: 0.5 },
				scale: isCurrent && { delay: 0.4, duration: 0.5 },
				translateY: isCurrent && { delay: 0, duration: 0.3 },
				translateX: isCurrent && { delay: 0, duration: 0.3 }
			}}
			onAnimationComplete={onAnimationEnd}
		>
			{/* FRONT */}
			<div className="absolute  backface-hidden h-full w-full" onClick={openCard}>
				{front}
			</div>
		</motion.div>
	);
};

export default FlipWrap;
