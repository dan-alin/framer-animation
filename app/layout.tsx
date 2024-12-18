import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export const metadata: Metadata = {
	title: 'POC - Framer',
	description: 'Transitions and animations'
};

declare module 'valtio' {
	function useSnapshot<T extends object>(p: T): T;
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[calc(100vh-64px)_64px] overflow-hidden bg-gray-100  min-h-screen  items-center`}
			>
				{children}
				<Navbar />
			</body>
		</html>
	);
}
