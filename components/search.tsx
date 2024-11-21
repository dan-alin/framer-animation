'use client';
import { searchStore } from '@/stores/search.store';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { useSnapshot } from 'valtio';

const Search = () => {
	const { open } = useSnapshot(searchStore);

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0, translateY: -100 }}
					animate={{ opacity: 1, translateY: 0 }}
					exit={{ opacity: 0, translateY: -100 }}
					className="absolute top-0 bg-white rounded-md mx-auto mt-2 w-[95vw] h-16 shadow-xl items-center justify-center p-2 z-5 border border-gray-100 "
				>
					<motion.input
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								searchStore.value = inputRef.current?.value ?? '';
							}
						}}
						autoFocus
						className="h-full w-full bg-gray-400/10 rounded-md outline-none p-2 "
						type="text"
						placeholder="Search..."
						defaultValue={searchStore.value}
						ref={inputRef}
					/>
					<kbd className="text-gray-500 font-bold uppercase border border-gray-100 bg-gray-300 text-xs py-2 p-2 rounded-lg flex items-center gap-2  absolute right-20 top-4">
						Esc
					</kbd>

					<kbd className="text-gray-500 font-bold uppercase border border-gray-100 bg-gray-300 text-xs py-2 p-2 rounded-lg flex items-center gap-2  absolute right-4 top-4">
						Enter
					</kbd>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Search;
