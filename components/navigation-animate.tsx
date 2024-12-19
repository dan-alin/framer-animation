import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Chip from './chip';
import { StarIcon } from 'lucide-react';

type NavigationAnimateProps = {
	openId: number;
};

const NavigationAnimate = ({ openId }: NavigationAnimateProps) => {
	const navigate = useRouter();
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
			onAnimationComplete={() => handleAnimatioonEnd(openId)}
			transition={{ duration: 0.5, delay: 0 }}
			className="absolute flex  justify-center top-0 bg-gray-100  h-32 w-64   z-50 shadow-lg rounded-md"
		>
			<div className=" col-span-12 row-span-1 text-2xl text-bold text-start flex flex-col gap-2 w-full uppercase items-center p-8 ">
				<div className="flex items-center gap-2 w-full">
					<StarIcon className="fill-gray-300 stroke-none size-6" />
					Card {openId + 1}
					{Array.from({ length: 3 }).map((_, i) => (
						<Chip key={i} />
					))}
				</div>
				<div className="text-sm   text-gray-600 uppercase items-center flex gap-2 col-span-12 row-span-1 w-full">
					<Chip isCategory /> • 21/11/2024
				</div>
			</div>
		</motion.div>
	);
};

export default NavigationAnimate;
