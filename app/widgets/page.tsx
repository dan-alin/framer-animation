'use client';

import FlipWidget from '@/components/flip-widget';
import NavigationAnimate from '@/components/navigation-animate';
import ScaleCard from '@/components/scale-card';
import { cardStore } from '@/stores/cards.store';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

type WidgetProps = {
	id: number;
	onClick?: (e: number) => void;
};

const FrontWidget = ({ id, onClick = () => null }: WidgetProps) => {
	const { cards } = useSnapshot(cardStore);

	return (
		<>
			<div className=" h-full w-full flex flex-col gap-2 ">
				<h1 className="uppercase rounded-t-lg font-bold px-2 py-1 ">widget {id}</h1>
				<div className="flex flex-col overflow-auto pb-2 gap-2">
					{cards
						.filter((line) => line.id <= 5)
						.map((line) => (
							<ScaleCard
								onClick={(id: number) => {
									onClick(id);
								}}
								performance={line.performance}
								volatility={line.volatility}
								risk={line.risk}
								tipology={line.tipology}
								key={line.id}
								desc={line.desc}
								id={line.id}
								title={line.title}
								progressive={true}
								inline
							/>
						))}
				</div>
			</div>
		</>
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

	const [openId, setOpenId] = useState(-1);
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
				front={<FrontWidget onClick={(e) => setOpenId(e)} id={1} />}
				back={<BackWidget id={1} />}
			/>
			<FlipWidget
				className="col-span-1 row-span-2 "
				id={2}
				front={<FrontWidget onClick={(e) => setOpenId(e)} id={2} />}
				back={<BackWidget id={2} />}
			/>
			<FlipWidget
				className="col-span-1 "
				id={3}
				front={<FrontWidget onClick={(e) => setOpenId(e)} id={3} />}
				back={<BackWidget id={3} />}
			/>
			<FlipWidget
				className="col-span-1 "
				id={4}
				front={<FrontWidget onClick={(e) => setOpenId(e)} id={4} />}
				back={<BackWidget id={4} />}
			/>

			<FlipWidget
				className="col-span-1"
				id={5}
				front={<FrontWidget onClick={(e) => setOpenId(e)} id={5} />}
				back={<BackWidget id={5} />}
			/>
			{openId !== -1 && <NavigationAnimate openId={openId} />}
		</div>
	);
}
