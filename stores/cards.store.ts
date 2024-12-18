import { proxy } from 'valtio';

type CardStore = {
	cards: Card[];
	progressiveAnimation: boolean;
};

type Card = {
	id: number;
	title: string;
	desc: string;
	performance: number;
	volatility: number;
	risk: number;
	tipology: string;
};

const descriptions = ['Example ', 'Element ', 'Item ', 'Component '];

const typologies = [
	'Equity',
	'Fixed Income',
	'Real Estate',
	'Commodities',
	'Private Equity',
	'Hedge Funds',
	'Derivatives'
];

const generatedCards: Card[] = Array.from({ length: 12 }, (_, i) => ({
	id: i,
	title: 'Card ' + (i + 1),
	desc: descriptions[Math.floor(Math.random() * descriptions.length)] + (i + 1),
	performance: Math.floor(Math.random() * 100),
	volatility: Math.floor(Math.random() * 100),
	risk: Math.floor(Math.random() * 100),
	tipology: typologies[Math.floor(Math.random() * typologies.length)]
}));

export const cardStore = proxy<CardStore>({
	cards: generatedCards,
	progressiveAnimation: false
});
