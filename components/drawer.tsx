import { FC } from 'react';

import clsx from 'clsx';
import { Button } from './button';

interface DrawerProps {
	open: boolean;
	closeDrawer?: () => void;
}

const Drawer: FC<DrawerProps> = ({ open, closeDrawer }) => {
	return (
		<div
			className={clsx(
				'bg-white border border-gray-500/20 rounded absolute h-3/4 right-0 top-32 z-50 w-[400px] shadow-lg transform-transition duration-300 flex flex-col justify-between p-4',
				open ? 'translate-x-0' : 'translate-x-[100%]'
			)}
		>
			<h1 className="font-bold uppercase">Drawer</h1>
			<div className="flex items-center justify-center text-gray-500">Drawer content</div>
			<div className="self-start">
				<Button onClick={closeDrawer}>Close</Button>
			</div>
		</div>
	);
};

export default Drawer;
