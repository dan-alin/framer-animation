'use client';

import Card from '@/components/card';
import Dialog from '@/components/dialog';
import { flipWrapStore } from '@/stores/current-card.store';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Detail() {
	const [sectionThree, setSectionThree] = useState(false);
	const [sectionFour, setSectionFour] = useState(false);
	const [sectionFive, setSectionFive] = useState(false);

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

	return (
		<motion.div className="grid grid-rows-12 grid-cols-12 gap-4 items-center justify-items-center min-h-screen p-8 pb-20  ">
			<motion.div
				initial={{ opacity: 0, translateY: -100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.5, delay: 0 }}
				className=" h-full w-full col-span-3 row-span-8 "
			>
				<Card title="section 1" />
			</motion.div>
			<motion.div
				initial={{ opacity: 0, translateX: 100 }}
				animate={{ opacity: 1, translateX: 0 }}
				transition={{ duration: 0.5, delay: 1 }}
				className=" h-full w-full col-span-9 row-span-8 "
			>
				<Card title="section 2" />
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
