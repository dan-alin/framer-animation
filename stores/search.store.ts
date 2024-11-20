import { proxy } from 'valtio';

type SearchStore = {
	value: string;
	open: boolean;
};

export const searchStore = proxy<SearchStore>({
	value: '',
	open: false
});
