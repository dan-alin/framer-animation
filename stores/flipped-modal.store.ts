import { proxy } from 'valtio';

type FlippedModalStoreProps = {
	flippedId: number;
	isAnimating: boolean;
};

export const flippedModalStore = proxy<FlippedModalStoreProps>({
	flippedId: -1,
	isAnimating: false
});
