import { flippedModalStore } from '@/stores/flipped-modal.store';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { ReactNode, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

type MotionLineCardProps = {
	id: number;
	front: ReactNode;
	back?: ReactNode;
};

const FlipModal = ({ id, front, back }: MotionLineCardProps) => {
	const { flippedId, isAnimating } = useSnapshot(flippedModalStore);
	const flipModalRef = useRef<HTMLDivElement>(null);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const openCard = () => {
		flippedModalStore.isAnimating = true;
		flippedModalStore.flippedId = id;
		reposition();
	};

	const closeCard = () => {
		flippedModalStore.isAnimating = true;
		flippedModalStore.flippedId = -1;
		reposition();
	};

	const isCurrent = flippedId === id;

	const reposition = () => {
		const card = flipModalRef.current;
		if (!card) return;
		const { top, left, width, height } = card.getBoundingClientRect();

		const x = window.innerWidth / 2 - width / 2 - left;
		const y = window.innerHeight / 2 - height / 2 - top;

		setX(x);
		setY(y);
	};

	return (
		<motion.div
			ref={flipModalRef}
			className={cn(
				' bg-white rounded-lg shadow-lg h-full w-full   transform-3d cursor-pointer',
				isAnimating && 'pointer-events-none'
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
				zIndex: isCurrent ? 100 : 1,
				// width: isCurrent ? '120%' : '100%',
				// height: isCurrent ? '120%' : '100%',
				scale: isCurrent ? 1.5 : 1
			}}
			transition={{
				zIndex: isCurrent ? { delay: 0 } : { delay: 0.5 },
				scale: isCurrent && { delay: 0.4, duration: 0.5 },
				translateY: isCurrent && { delay: 0, duration: 0.3 },
				translateX: isCurrent && { delay: 0, duration: 0.3 }
				// width: isCurrent && { delay: 0.3, duration: 0.5 }
			}}
			onAnimationComplete={() => (flippedModalStore.isAnimating = false)}
		>
			{/* FRONT */}
			<div className="absolute  backface-hidden h-full w-full" onClick={openCard}>
				{front}
			</div>

			{/* BACK */}
			{back && (
				<div
					className="absolute  backface-hidden h-full w-full translate-y-180"
					onClick={closeCard}
				>
					{back}
				</div>
			)}
		</motion.div>
	);
};

export default FlipModal;
