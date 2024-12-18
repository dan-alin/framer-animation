import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
	return (
		<button
			className={cn(
				'cursor-pointer bg-primary-dark text-white px-4 py-2 rounded active:scale-95 transition-transform duration-200 uppercase text-sm font-bold focus:outline-none focus:ring-2  focus:ring-offset-1 focus:ring-primary-dark',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button };
