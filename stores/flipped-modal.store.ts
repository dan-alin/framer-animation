import { proxy } from 'valtio';

type FlipModalStoreProps = {
	flippedId: number;
	isAnimating: boolean;
};

export const flipModalStore = proxy<FlipModalStoreProps>({
	flippedId: -1,
	isAnimating: false
});
