'use client';

import FlipWidget from '@/components/flip-widget';
import LineMock from '@/components/line-mock';
import { cardStore } from '@/stores/cards.store';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

type WidgetProps = {
	id: number;
};

const FrontWidget = ({ id }: WidgetProps) => {
	const { cards } = useSnapshot(cardStore);
	return (
		<div className=" h-full w-full flex flex-col gap-2 ">
			<h1 className="   uppercase rounded-t-lg font-bold px-2 py-1 ">widget {id}</h1>
			<div className="flex flex-col overflow-auto pb-2 gap-2">
				{cards
					.filter((line) => line.id <= 5)
					.map((line) => (
						<LineMock id={line.id} key={line.id} name={line.desc} percentage={line.performance} />
					))}
			</div>
		</div>
	);
};

const BackWidget = ({ id }: WidgetProps) => {
	return (
		<div className=" h-full w-full">
			<h1 className="   uppercase rounded-t-lg font-bold  px-2 py-1 ">Back Widget{id + 1}</h1>
			<p className="h-full w-full text-sm p-2 px-4 text-center text-gray-600 flex items-center justify-center ">
				This is the back of widget {id}. Click again to bring it back to it's original position.
			</p>
		</div>
	);
};

export default function Widget() {
	const { flippedId, isAnimating } = useSnapshot(flipModalStore);

	useEffect(() => {
		flipModalStore.flippedId = -1;
	}, []);

	return (
		<div
			className={`grid grid-cols-3  grid-rows-[repeat(2,minmax(0,350px))] items-center justify-items-center h-full p-8 gap-4 w-full overflow-hidden `}
			id="widget-grid"
		>
			{(flippedId !== -1 || isAnimating) && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1
					}}
					exit={{ opacity: 0 }}
					transition={{ opacity: { duration: 0.5 } }}
					className="absolute top-0 left-0 w-full h-full bg-gray-900/30 flex items-center justify-center z-3 "
				></motion.div>
			)}
			<FlipWidget
				className="col-span-1 "
				id={1}
				front={<FrontWidget id={1} />}
				back={<BackWidget id={1} />}
			/>
			<FlipWidget
				className="col-span-1 row-span-2 "
				id={2}
				front={<FrontWidget id={2} />}
				back={<BackWidget id={2} />}
			/>
			<FlipWidget
				className="col-span-1 "
				id={3}
				front={<FrontWidget id={3} />}
				back={<BackWidget id={3} />}
			/>
			<FlipWidget
				className="col-span-1 "
				id={4}
				front={<FrontWidget id={4} />}
				back={<BackWidget id={4} />}
			/>

			<FlipWidget
				className="col-span-1"
				id={5}
				front={<FrontWidget id={5} />}
				back={<BackWidget id={5} />}
			/>
		</div>
	);
}
