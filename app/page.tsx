'use client';
import { Button } from '@/components/button';
import Dialog from '@/components/dialog';
import Drawer from '@/components/drawer';
import { default as FlipWrap } from '@/components/flip-wrap';
import { flipWrapStore } from '@/stores/current-card.store';
import { flipModalStore } from '@/stores/flipped-modal.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type FrontCardProps = {
	id: number;
};

const FrontCard = ({ id }: FrontCardProps) => {
	return (
		<div className=" h-full w-full">
			<h1 className=" bg-primary-dark text-white uppercase rounded-t-lg font-bold px-2 py-1 ">
				Front {id + 1}
			</h1>
			<p className="text-sm p-2 text-gray-600">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, aspernatur.
			</p>
		</div>
	);
};

export default function Home() {
	const [bottomOpen, setBottomOpen] = useState(false);
	const [fadeOpen, setFadeOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

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

	const completeNavigation = () => {
		flipWrapStore.isAnimating = false;

		flipWrapStore.triggered && navigate.push(`/${flipWrapStore.flippedId + 1}`);
	};

	return (
		<div className="flex flex-col items-center justify-items-center h-full p-8 gap-8  ">
			<div className="flex gap-4  justify-end w-full">
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
			<div className="grid grid-cols-3 grid-rows-[repeat(4,150px)]  w-full h-full gap-6">
				{Array.from({ length: 12 }).map((_, i) => (
					<FlipWrap
						onAnimationEnd={completeNavigation}
						key={i}
						id={i}
						front={<FrontCard id={i} />}
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
		</div>
	);
}
