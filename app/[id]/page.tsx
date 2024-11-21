'use client';

import Card from '@/components/card';
import Dialog from '@/components/dialog';
import { flipWrapStore } from '@/stores/current-card.store';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Detail() {
	const [sectionThree, setSectionThree] = useState(false);
	const [sectionFour, setSectionFour] = useState(false);
	const [sectionFive, setSectionFive] = useState(false);

	const [sectionTwoExpanded, setSectionTwoExpanded] = useState<boolean | undefined>();
	const [isAnimating, setIsAnimating] = useState(false);

	const pathname = usePathname().replace('/', '');

	const sectionTwoRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	useEffect(() => {
		flipWrapStore.flippedId = -1;
		flipWrapStore.triggered = false;
	}, []);

	const handleModal = (section: number) => {
		switch (section) {
			case 3:
				setSectionThree(!sectionThree);
				break;
			case 4:
				setSectionFour(!sectionFour);
				break;
			case 5:
				setSectionFive(!sectionFive);
				break;
			default:
				break;
		}
	};

	const handleExpand = () => {
		//get the position to center the card

		const card = sectionTwoRef.current;
		const grid = gridRef.current;
		if (!card || !grid) return;
		setIsAnimating(true);
		setSectionTwoExpanded(sectionTwoExpanded ? false : true);

		const { top, left, width, height } = card.getBoundingClientRect();
		const { width: gridWidth, height: gridHeight } = grid.getBoundingClientRect();

		const x = gridWidth / 2 - width / 2 - left;

		//center the card vertically
		const y = gridHeight / 2 - height / 2 - top;

		setX(x);
		setY(y);
	};

	return (
		<motion.div
			ref={gridRef}
			className="grid grid-rows-[repeat(13,40px)] grid-cols-12 gap-4 items-center justify-items-center  h-full p-8 w-full"
		>
			<AnimatePresence>
				{sectionTwoExpanded && !isAnimating && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0 }}
						className=" h-full w-full absolute bg-gray-900/30 z-5"
					></motion.div>
				)}
			</AnimatePresence>
			<div className="col-span-12 row-span-1 text-2xl text-bold text-start w-full uppercase">
				Card {pathname}
			</div>
			<motion.div
				initial={{ opacity: 0, translateX: -100 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.5, delay: 0 }}
				className=" h-full w-full col-span-3 row-span-8 "
			>
				<Card title="section 1" />
			</motion.div>
			<motion.div
				ref={sectionTwoRef}
				onClick={handleExpand}
				initial={{ opacity: 0, translateX: 100 }}
				animate={{
					opacity: 1,
					translateX: sectionTwoExpanded ? x : 0,
					translateY: y,
					height: sectionTwoExpanded ? '85dvh' : '100%',
					width: sectionTwoExpanded ? '97dvw' : '100%',
					zIndex: sectionTwoExpanded ? 10 : 1
				}}
				onAnimationComplete={() => {
					setIsAnimating(false);
				}}
				transition={{
					duration: 0.5,
					delay: sectionTwoExpanded !== undefined ? 0 : 1,
					zIndex: { delay: 0.5 }
				}}
				className={cn(
					' h-full w-full col-span-9 row-span-8 cursor-pointer',
					isAnimating && 'pointer-events-none'
				)}
			>
				<Card title="section 2">
					<p className="text-sm text-gray-500">Click this card to expand/shrink </p>
				</Card>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, translateY: 100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className=" h-full w-full col-span-4 row-span-4 cursor-pointer"
				onClick={() => handleModal(3)}
			>
				<Card title="section 3">
					<p className="text-sm text-gray-500">Click this card to open the detail</p>
				</Card>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, translateY: 100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				className=" h-full w-full col-span-4 row-span-4 cursor-pointer"
				onClick={() => handleModal(4)}
			>
				<Card title="section 4">
					<p className="text-sm text-gray-500">Click this card to open the detail</p>
				</Card>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, translateY: 100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.5, delay: 0.7 }}
				className=" h-full w-full col-span-4 row-span-4 cursor-pointer"
				onClick={() => handleModal(5)}
			>
				<Card title="section 5">
					<p className="text-sm text-gray-500">Click this card to open the detail</p>
				</Card>
			</motion.div>

			<Dialog
				bottom
				isFull
				open={sectionThree}
				title="Section 3"
				body="This is a placeholder text for the 3rd section..."
				onCancel={() => handleModal(3)}
			/>
			<Dialog
				bottom
				isFull
				open={sectionFour}
				title="Section 4"
				body="This is a placeholder text for the 4th section..."
				onCancel={() => handleModal(4)}
			/>
			<Dialog
				bottom
				isFull
				open={sectionFive}
				title="Section 5"
				body="This is a placeholder text for the 5th section..."
				onCancel={() => handleModal(5)}
			/>
		</motion.div>
	);
}
