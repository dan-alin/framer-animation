type ChipProps = {
	isCategory?: boolean;
};

const Chip = ({ isCategory = false }: ChipProps) => {
	return (
		<div className=" flex items-center h-4 text-xs justify-center bg-gray-300 text-gray-500 uppercase rounded-full p-0.5 px-2">
			{isCategory ? 'category' : 'tag'}
		</div>
	);
};

export default Chip;
