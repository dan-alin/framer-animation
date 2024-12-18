import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="bg-white   shadow-2xl border border-gray-100 text-gray-500 p-4 h-16 z-50 flex w-full items-center justify-center gap-10 uppercase ">
			<Link className="hover:text-primary-dark" href={'/'}>
				card
			</Link>
			<Link className="hover:text-primary-dark" href={'widgets'}>
				widget
			</Link>

			{/* <Link className="hover:text-primary-dark" href={'loading'}>
				loading
			</Link> */}
		</nav>
	);
};

export default Navbar;
