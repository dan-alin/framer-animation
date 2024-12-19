'use client';

import Card from '@/components/card';
import Chip from '@/components/chip';
import Dialog from '@/components/dialog';
import { cardStore } from '@/stores/cards.store';
import { cn } from '@/utils/cn';
import { StarIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

export default function Detail() {
	const [sectionThree, setSectionThree] = useState(false);
	const [sectionFour, setSectionFour] = useState(false);
	const [sectionFive, setSectionFive] = useState(false);

	const [sectionTwoExpanded, setSectionTwoExpanded] = useState<boolean | undefined>();
	const [isAnimating, setIsAnimating] = useState(false);
	const [ready, setReady] = useState(false);

	const { cards } = useSnapshot(cardStore);

	const pathname = usePathname().replace('/', '');

	const sectionTwoRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

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
		const card = sectionTwoRef.current;
		const grid = gridRef.current;
		if (!card || !grid) return;
		setIsAnimating(true);
		setSectionTwoExpanded(sectionTwoExpanded ? false : true);

		const { top, left, width, height } = card.getBoundingClientRect();

		const x = window.innerWidth / 2 - width / 2 - left;
		const y = window.innerHeight / 2 - height / 2 - top - 35;

		setX(x);
		setY(y);
	};

	return (
		<motion.div
			ref={gridRef}
			className={cn(
				'grid grid-rows-[repeat(11,60px)] grid-cols-12 gap-3 items-center justify-items-center  h-[calc(100vh-64px)] p-8 w-full',
				!ready && 'pointer-events-none'
			)}
		>
			<AnimatePresence>
				{sectionTwoExpanded && !isAnimating && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0 }}
						className=" min-h-screen w-screen absolute top-0 bg-gray-900/30 z-5"
					></motion.div>
				)}
			</AnimatePresence>
			<div className=" col-span-12 row-span-1 text-2xl text-bold text-start flex flex-col gap-2 w-full uppercase items-center">
				<div className="flex items-center gap-2 w-full">
					<StarIcon className="fill-gray-300 stroke-none size-6" />
					{cards.find((card) => card.id === Number(pathname) - 1)?.desc}
					{Array.from({ length: 3 }).map((_, i) => (
						<Chip key={i} />
					))}
				</div>
				<div className="text-sm   text-gray-600 uppercase items-center flex gap-2 col-span-12 row-span-1 w-full">
					<Chip isCategory /> • 21/11/2024
				</div>
			</div>

			{/* SECTION 1 */}
			<motion.div
				initial={{ opacity: 0, translateX: -100 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.5, delay: 0 }}
				className=" h-full w-full col-span-3 row-span-7 "
			>
				<Card title="section 1" />
			</motion.div>

			{/* SECTION 2 */}
			<motion.div
				ref={sectionTwoRef}
				onClick={handleExpand}
				initial={{ opacity: 0, translateX: 100 }}
				animate={{
					opacity: 1,
					translateX: sectionTwoExpanded ? x : 0,
					translateY: sectionTwoExpanded ? y : 0,
					height: sectionTwoExpanded ? 'calc(100dvh - 80px)' : '100%',
					width: sectionTwoExpanded ? '99dvw' : '100%',
					zIndex: sectionTwoExpanded ? 10 : 1
				}}
				onAnimationComplete={() => {
					setReady(true);
					setIsAnimating(false);
				}}
				transition={{
					duration: 0.5,
					delay: sectionTwoExpanded !== undefined ? 0 : 1,
					zIndex: { delay: 0.5 }
				}}
				className={cn(
					' h-full w-full col-span-9 row-span-7 cursor-pointer',
					isAnimating && 'pointer-events-none'
				)}
			>
				<Card title="section 2">
					<p className="text-sm text-gray-500">Click this card to expand/shrink </p>
				</Card>
			</motion.div>

			{/* SECTION 3 */}
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

			{/* SECTION 4 */}
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

			{/* SECTION 5 */}
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

			{/* DIALOGS */}
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
