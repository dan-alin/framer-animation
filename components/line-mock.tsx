type LineMockProps = {
	name: string;
	percentage: number;
};

const LineMock = ({ name, percentage }: LineMockProps) => (
	<div className="flex items-center w-full  gap-2 px-2">
		<div className="flex items-center  gap-2 w-full">
			<span className=" flex aspect-square size-4 bg-primary-dark rounded-sm" />
			<p>{name}</p>
		</div>

		<span className="justify-self-end font-bold"> {percentage}% </span>
	</div>
);

export default LineMock;
