'use client';

import { FC, ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './button';

export type DialogProps = {
	title?: string;
	body?: ReactNode;
	open: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
	bottom?: boolean;
	showFooter?: boolean;
	isFull?: boolean;
};

const Dialog: FC<DialogProps> = ({
	title,
	body,
	onConfirm,
	onCancel,
	open,
	bottom = false,
	showFooter = false,
	isFull = false
}) => {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="fixed top-0 left-0 w-full h-full bg-gray-900/30 flex items-center justify-center z-30 "
				>
					<motion.div
						initial={bottom ? { translateY: '500%' } : { opacity: 0 }}
						animate={bottom ? { translateY: 0 } : { opacity: 1 }}
						exit={bottom ? { translateY: '500%' } : { opacity: 0 }}
						transition={{ duration: 0.5 }}
						className={cn(
							'bg-white rounded-lg p-8 shadow-lg z-50  flex flex-col gap-4 min-w-[400px]',
							isFull && 'h-[88dvh] w-[95dvw] mb-20'
						)}
					>
						<div className="font-bold uppercase flex items-center justify-between">
							{title}
							<span onClick={onCancel} className="text-gray-500 cursor-pointer">
								✕
							</span>
						</div>
						<div className="text-sm text-gray-500">{body}</div>

						{showFooter && (
							<div className="flex gap-4 justify-between">
								<Button
									className="bg-white outline outline-primary text-primary "
									onClick={onCancel}
								>
									Cancel
								</Button>
								<Button onClick={onConfirm}> Confirm</Button>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Dialog;
