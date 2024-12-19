import { FC } from 'react';

import clsx from 'clsx';
import { Button } from './button';
import { configStore } from '@/stores/config.store';
import { useSnapshot } from 'valtio';

interface DrawerProps {
	open: boolean;
	closeDrawer?: () => void;
}

const Drawer: FC<DrawerProps> = ({ open, closeDrawer }) => {
	const { showPerformance, showVolatility, showTipology } = useSnapshot(configStore);

	return (
		<div
			className={clsx(
				'bg-white fixed border border-gray-500/20 rounded  h-3/4 right-0 top-32 z-50 w-[400px] shadow-lg transform-transition duration-300 flex flex-col justify-between p-4',
				open ? 'translate-x-0' : 'translate-x-[100%]'
			)}
		>
			<h1 className="font-bold uppercase">Drawer</h1>
			<div className="flex flex-col gap-2  text-gray-500 h-full pt-4">
				<div className=" uppercase text-gray-400 flex items-center gap-1 font-bold">
					<input
						type="checkbox"
						id="typology"
						className="size-4 cursor-pointer"
						checked={showTipology}
						onChange={(e) => {
							configStore.showTipology = e.target.checked;
						}}
					></input>

					<label htmlFor="typology"> typology</label>
				</div>
				<div className=" uppercase text-gray-400 flex items-center gap-1 font-bold">
					<input
						type="checkbox"
						id="performance"
						className="size-4 cursor-pointer"
						checked={showPerformance}
						onChange={(e) => {
							configStore.showPerformance = e.target.checked;
						}}
					></input>
					<label htmlFor="performance"> Performance</label>
				</div>

				<div className=" uppercase text-gray-400 flex items-center gap-1 font-bold">
					<input
						type="checkbox"
						id="volatility"
						className="size-4 cursor-pointer"
						checked={showVolatility}
						onChange={(e) => {
							configStore.showVolatility = e.target.checked;
						}}
					></input>
					<label htmlFor="volatility"> volatility</label>
				</div>
			</div>
			<div className="self-start">
				<Button onClick={closeDrawer}>Close</Button>
			</div>
		</div>
	);
};

export default Drawer;
