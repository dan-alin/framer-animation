import { proxy } from 'valtio';

type FlipWrapStoreProps = {
	flippedId: number;
	isAnimating: boolean;
	triggered: boolean;
};

export const flipWrapStore = proxy<FlipWrapStoreProps>({
	flippedId: -1,
	isAnimating: false,
	triggered: false
});
