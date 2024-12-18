import { proxy } from 'valtio';

type ConfigStore = {
	showPerformance: boolean;
	showVolatility: boolean;
	showTipology: boolean;
};

export const configStore = proxy<ConfigStore>({
	showPerformance: true,
	showVolatility: true,
	showTipology: true
});
