'use client';
import { Button } from '@/components/button';
import Dialog from '@/components/dialog';
import Drawer from '@/components/drawer';
import ScaleCard from '@/components/scale-card';

import Search from '@/components/search';
import { cardStore } from '@/stores/cards.store';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { searchStore } from '@/stores/search.store';
import { SearchIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

export default function Home() {
	const [bottomOpen, setBottomOpen] = useState(false);
	const [fadeOpen, setFadeOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [progressive, setProgressive] = useState(false);

	const pathname = usePathname();
	const { open, value } = useSnapshot(searchStore);

	const { cards } = useSnapshot(cardStore);

	const navigate = useRouter();

	useEffect(() => {
		flipModalStore.flippedId = -1;
	}, []);

	const handleBottomClick = () => {
		setBottomOpen(!bottomOpen);
	};

	const handleFadeClick = () => {
		setFadeOpen(!fadeOpen);
	};

	const handleDrawerClick = () => {
		setDrawerOpen(!drawerOpen);
	};

	const handleSearchOpen = () => {
		searchStore.open = !open;
	};

	const handleProgressiveClick = () => {
		setProgressive(!progressive);
	};

	useEffect(() => {
		if (pathname === '/') {
			function handleKeydown(event: KeyboardEvent) {
				if (event.ctrlKey && event.key.toLowerCase() === 'k') {
					console.log('Ctrl/Command + K detected');
					event.preventDefault(); // Prevent default behavior (optional)
					// Your custom logic here
					searchStore.open = !searchStore.open;
				}

				if (event.key === 'Escape') {
					searchStore.open = false;
				}
			}

			window.addEventListener('keydown', handleKeydown);

			return () => {
				window.removeEventListener('keydown', handleKeydown);
			};
		}
	}, [pathname]);

	return (
		<div
			className="flex flex-col items-center justify-items-center h-full py-24 gap-4 w-full max-w-[1300px] px-[14px]  "
			id="main-page"
		>
			<div className="flex gap-4  justify-between items-center w-full ">
				<div className="flex items-center gap-6">
					<kbd
						onClick={handleSearchOpen}
						className="text-gray-500 font-bold uppercase border border-gray-100 bg-gray-300 text-xs py-2 p-2 rounded-lg flex items-center gap-2 hover:text-gray-600 hover:bg-gray-300 cursor-pointer "
					>
						<SearchIcon className="  size-4" />
						Ctrl + K
					</kbd>

					<div className=" uppercase text-gray-400 flex items-center justify-center gap-1 font-bold">
						<input
							type="checkbox"
							id="progressive"
							className="size-4 cursor-pointer"
							onChange={handleProgressiveClick}
						></input>
						<label htmlFor="progressive">Progressive Animation</label>
					</div>
				</div>

				<div className="flex justify-end items-center gap-4">
					<Button onClick={handleFadeClick} type="button">
						Fade
					</Button>
					<Button onClick={handleBottomClick} type="button">
						Bottom
					</Button>

					<Button onClick={handleDrawerClick} type="button">
						Drawer
					</Button>
				</div>
			</div>
			<div className="flex flex-wrap w-full h-full gap-6 " key={progressive.toString()}>
				<AnimatePresence>
					{cards
						.filter((card) => {
							return (
								card.desc.toLowerCase().includes(value.toLowerCase()) ||
								card.title.toLowerCase().includes(value.toLowerCase())
							);
						})
						.map((card) => (
							<ScaleCard
								key={card.id}
								desc={card.desc}
								id={card.id}
								title={card.title}
								progressive={progressive}
							/>
						))}
				</AnimatePresence>
			</div>

			<Dialog
				showFooter
				bottom
				onCancel={handleBottomClick}
				onConfirm={handleBottomClick}
				body="Bottom modal example"
				open={bottomOpen}
				title="Modal"
			/>
			<Dialog
				showFooter
				onCancel={handleFadeClick}
				onConfirm={handleFadeClick}
				body="Fade modal example"
				open={fadeOpen}
				title="Modal"
			/>
			<Drawer closeDrawer={handleDrawerClick} open={drawerOpen} />
			<Search />
		</div>
	);
}
