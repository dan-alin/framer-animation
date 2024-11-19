import { PropsWithChildren } from 'react';

type CardProps = {
	title: string;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({ title, children }) => (
	<div className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-2 h-full w-full">
		<div className="font-bold uppercase">{title}</div>
		<div>{children}</div>
	</div>
);

export default Card;
