import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

type LineMockProps = {
	name: string;
	percentage: number;
	id: number;
};

const LineMock = ({ name, percentage, id }: LineMockProps) => {
	const navigate = useRouter();
	const handleNavigation = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		navigate.push(`/${id + 1}`);
	};

	return (
		<div onClick={handleNavigation} className="flex items-center w-full  gap-2 px-2">
			<div className="flex items-center  gap-2 w-full">
				<span className=" flex aspect-square size-4 bg-primary-dark rounded-sm" />
				<p>{name}</p>
			</div>

			<span className="justify-self-end font-bold"> {percentage}% </span>
		</div>
	);
};

export default LineMock;
