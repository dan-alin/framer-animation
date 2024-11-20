'use clienbt';
import { searchStore } from '@/stores/search.store';
import { AnimatePresence, motion } from 'motion/react';
import { useSnapshot } from 'valtio';

type SearchProps = {
	visible: boolean;
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ handleSearch }: SearchProps) => {
	const { open } = useSnapshot(searchStore);
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
						className="h-full w-full bg-gray-400/10 rounded-md outline-none p-2"
						type="text"
						placeholder="Search..."
						onChange={handleSearch}
						value={searchStore.value}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Search;
