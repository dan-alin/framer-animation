const FixedMenu = () => {
	return (
		<div className="fixed bottom-0 width-[90%] ">
			<div>FixedMenu</div>
			<Test />
		</div>
	);
};

const Test = () => {
	return (
		<div>
			<FixedMenu />
		</div>
	);
};

export default Test;
