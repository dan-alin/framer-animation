'use client';
import { cardStore } from '@/stores/cards.store';
import { searchStore } from '@/stores/search.store';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { useSnapshot } from 'valtio';
import ScaleCard from './scale-card';

const Search = () => {
	const { open, value } = useSnapshot(searchStore);
	const { cards, progressiveAnimation } = useSnapshot(cardStore);

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, translateY: -100 }}
					animate={{ opacity: 1, translateY: 0 }}
					exit={{ opacity: 0, translateY: -100 }}
					className="absolute  top-0 bg-white rounded-md mx-auto mt-2 w-[95vw] h-2/3  shadow-2xl items-center justify-center py-2 px-4  z-5 border border-gray-200 "
				>
					<motion.input
						onChange={() => {
							searchStore.value = inputRef.current?.value ?? '';
						}}
						autoFocus
						className="h-12 w-full bg-gray-400/10 rounded-md outline-none p-2 focus:ring-2 focus:ring-gray-400/30"
						type="text"
						placeholder="Search..."
						defaultValue={searchStore.value}
						ref={inputRef}
					/>
					<kbd
						onClick={() => (searchStore.open = false)}
						className="text-gray-500 font-bold uppercase border border-gray-100 bg-gray-300 text-xs py-2 p-2 rounded-lg flex items-center gap-2  absolute right-5 top-4"
					>
						Esc
					</kbd>

					<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  gap-4 mt-10 max-h-[89%] overflow-x-hidden overflow-y-auto pb-8">
						<AnimatePresence>
							{value.length >= 3 &&
								cards
									.filter((card) => {
										return (
											card.desc.toLowerCase().includes(value.toLowerCase()) ||
											card.title.toLowerCase().includes(value.toLowerCase())
										);
									})
									.map((card) => (
										<ScaleCard
											key={card.id}
											id={card.id}
											title={card.title}
											desc={card.desc}
											performance={card.performance}
											volatility={card.volatility}
											risk={card.risk}
											progressive={progressiveAnimation}
										></ScaleCard>
									))}
						</AnimatePresence>
						<div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white left-0 to-transparent" />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Search;
