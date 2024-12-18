'use client';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

type MotionLineCardProps = {
	id: number;
	front: ReactNode;
	back: ReactNode;
	onAnimationEnd?: () => void;
	scale?: number;
	className?: string;
};

const FlipWidget = ({ id, front, back, className }: MotionLineCardProps) => {
	const { flippedId, isAnimating } = useSnapshot(flipModalStore);
	const cardRef = useRef<HTMLDivElement>(null);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [isCurrent, setIsCurrent] = useState(false);

	const openCard = () => {
		flipModalStore.isAnimating = true;
		flipModalStore.flippedId = id;
		reposition();
	};

	const closeCard = () => {
		flipModalStore.isAnimating = true;
		flipModalStore.flippedId = -1;
		reposition();
	};

	useEffect(() => {
		setIsCurrent(flippedId === id);
	}, [flippedId, id]);

	const reposition = () => {
		const card = cardRef.current;
		if (!card) return;
		const { top, left, width, height } = card.getBoundingClientRect();
		const widgetGrid = document.getElementById('widget-grid');

		if (!widgetGrid) return;
		const x = widgetGrid.clientWidth / 2 - width / 2 - left;
		const y = widgetGrid.clientHeight / 2 - height / 2 - top;

		setX(x);
		setY(y);
	};
	return (
		<motion.div
			ref={cardRef}
			className={cn(
				'bg-white flex items-center justify-center rounded-lg shadow-lg h-full w-full transform-3d cursor-pointer perspective-[1000px]',
				isAnimating && 'pointer-events-none',
				className
			)}
			initial={{
				rotateY: 0,
				translateX: 0,
				translateY: 0,
				zIndex: 1
			}}
			animate={{
				rotateY: isCurrent ? 180 : 0,
				translateX: x,
				translateY: y,
				zIndex: isCurrent ? 50 : 1,
				height: isCurrent ? '716px' : '100%'
			}}
			transition={{
				zIndex: isCurrent ? { delay: 0 } : { delay: 0.5 },
				translateY: isCurrent && { delay: 0, duration: 0.5 },
				translateX: isCurrent && { delay: 0, duration: 0.5 },
				height: isCurrent && { delay: 0.2, duration: 0.3 }
			}}
			onAnimationComplete={() => {
				flipModalStore.isAnimating = false;
			}}
			onWheel={(e) => {
				e.stopPropagation();
			}}
		>
			{/* FRONT */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isCurrent ? 0 : 1 }}
				transition={{ duration: 0.2, delay: 0.3 }}
				onWheel={(e) => {
					e.stopPropagation();
				}}
				className="absolute backface-hidden h-full w-full backface-hidden-wk"
				onClick={openCard}
			>
				{front}
			</motion.div>

			{/* BACK */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isCurrent ? 1 : 0 }}
				transition={{ duration: 0.2, delay: 0.3 }}
				className="absolute backface-hidden h-full w-full rotate-y-180 safari-flip"
				onClick={closeCard}
			>
				{back}
			</motion.div>
		</motion.div>
	);
};

export default FlipWidget;
