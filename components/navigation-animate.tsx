import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Chip from './chip';
import { StarIcon } from 'lucide-react';
import { useSnapshot } from 'valtio';
import { cardStore } from '@/stores/cards.store';
import { cn } from '@/utils/cn';

type NavigationAnimateProps = {
	openId: number;
};

const NavigationAnimate = ({ openId }: NavigationAnimateProps) => {
	const navigate = useRouter();
	const { cards } = useSnapshot(cardStore);
	const handleAnimatioonEnd = (id: number) => {
		navigate.push(`/${id + 1}`);
	};

	return (
		<motion.div
			initial={{
				translateY: 500,
				width: 0,
				height: 0
			}}
			animate={{
				translateY: 0,
				width: '100vw',
				height: '100vh'
			}}
			transition={{ duration: 0.5, delay: 0 }}
			className="absolute flex  justify-center top-0 bg-gray-100  h-32 w-64   z-50 shadow-lg rounded-md"
		>
			<div className="  text-2xl text-bold text-start flex flex-col gap-2 w-full uppercase items-start p-8 ">
				<div className="flex items-center gap-2 w-full">
					<motion.span
						initial={{ opacity: 0, translateX: -50 }}
						animate={{ opacity: 1, translateX: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						onAnimationComplete={() => handleAnimatioonEnd(openId)}
					>
						<StarIcon className="fill-gray-300 stroke-none size-6" />{' '}
					</motion.span>
					{cards.find((card) => card.id === openId)?.desc}
					{Array.from({ length: 3 }).map((_, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							<Chip key={i} />
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, translateX: -50 }}
					animate={{ opacity: 1, translateX: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className={'text-sm  text-gray-600 uppercase items-center flex gap-2 '}
				>
					<Chip isCategory /> • 21/11/2024
				</motion.div>
			</div>
		</motion.div>
	);
};

export default NavigationAnimate;
