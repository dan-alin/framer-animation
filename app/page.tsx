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
import NavigationAnimate from '@/components/navigation-animate';

export default function Home() {
	const [fadeOpen, setFadeOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [openId, setOpenId] = useState(-1);

	const pathname = usePathname();
	const { open } = useSnapshot(searchStore);

	const { cards, progressiveAnimation } = useSnapshot(cardStore);

	useEffect(() => {
		setOpenId(-1);
		flipModalStore.flippedId = -1;
	}, []);

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
		cardStore.progressiveAnimation = !progressiveAnimation;
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
			className="flex flex-col items-center justify-items-center h-full pt-24 gap-4 w-full max-w-[2160px] px-8 mx-auto"
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
							checked={progressiveAnimation}
							onChange={handleProgressiveClick}
						></input>
						<label htmlFor="progressive">Progressive Animation</label>
					</div>
				</div>

				<div className="flex justify-end items-center gap-4">
					<Button onClick={handleFadeClick} type="button">
						Modal
					</Button>

					<Button onClick={handleDrawerClick} type="button">
						Config
					</Button>
				</div>
			</div>

			<div className="relative h-full w-full overflo-auto overflow-x-hidden">
				<div
					className="relative grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] px-1  w-full  overflow-y-auto overflow-x-hidden gap-4 pb-8 "
					key={progressiveAnimation.toString()}
				>
					<AnimatePresence>
						{cards.map((card) => (
							<ScaleCard
								onClick={(id: number) => {
									setOpenId(id);
								}}
								performance={card.performance}
								volatility={card.volatility}
								risk={card.risk}
								tipology={card.tipology}
								key={card.id}
								desc={card.desc}
								id={card.id}
								title={card.title}
								progressive={progressiveAnimation}
							/>
						))}
					</AnimatePresence>
				</div>
			</div>

			{openId !== -1 && <NavigationAnimate openId={openId} />}

			<Dialog
				showFooter
				onCancel={handleFadeClick}
				onConfirm={handleFadeClick}
				body="Modal example"
				open={fadeOpen}
				title="Modal"
			/>
			<Drawer closeDrawer={handleDrawerClick} open={drawerOpen} />
			<Search />
		</div>
	);
}
