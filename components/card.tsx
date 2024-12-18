import { cn } from '@/utils/cn';
import { PropsWithChildren } from 'react';

type CardProps = {
	title: string;
	colored?: boolean;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({ title, children, colored = false }) => (
	<div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 h-full w-full">
		<div className={cn('font-bold uppercase', colored && 'bg-primary-dark text-white')}>
			{title}
		</div>
		<div>{children}</div>
	</div>
);

export default Card;
