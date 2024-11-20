'use client';
import { Button } from '@/components/button';
import Dialog from '@/components/dialog';
import Drawer from '@/components/drawer';
import { default as FlipWrap } from '@/components/flip-wrap';
import Search from '@/components/search';
import { cardStore } from '@/stores/cards.store';
import { flipWrapStore } from '@/stores/current-card.store';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { searchStore } from '@/stores/search.store';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

type FrontCardProps = {
	id: number;
	desc: string;
};

const FrontCard = ({ id, desc }: FrontCardProps) => {
	return (
		<div className=" h-full w-full">
			<h1 className=" bg-primary-dark text-white uppercase rounded-t-lg font-bold px-2 py-1 ">
				Card {id + 1}
			</h1>
			<p className="text-sm p-2 text-gray-600">{desc}</p>
		</div>
	);
};

export default function Home() {
	const [bottomOpen, setBottomOpen] = useState(false);
	const [fadeOpen, setFadeOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { open, value } = useSnapshot(searchStore);

	const { cards } = useSnapshot(cardStore);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		searchStore.value = e.target.value;
	};

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

	const completeNavigation = () => {
		flipWrapStore.isAnimating = false;

		flipWrapStore.triggered && navigate.push(`/${flipWrapStore.flippedId + 1}`);
	};

	return (
		<div className="flex flex-col items-center justify-items-center h-full p-8 gap-4  ">
			<div className="flex gap-4  justify-between items-center w-full mt-12">
				<SearchIcon
					onClick={handleSearchOpen}
					className="text-gray-500 hover:text-primary-dark cursor-pointer"
				/>

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
			<div className="grid grid-cols-3 grid-rows-[repeat(auto,200px)]  w-full h-full gap-6">
				{cards
					.filter((card) => card.desc.toLowerCase().includes(value.toLowerCase()))
					.map((card) => (
						<FlipWrap
							onAnimationEnd={completeNavigation}
							key={card.id}
							id={card.id}
							front={<FrontCard desc={card.desc} id={card.id} />}
						/>
					))}
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
			<Search visible={open} handleSearch={handleSearch} />
		</div>
	);
}
