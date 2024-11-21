import { proxy } from 'valtio';

type CardStore = {
	cards: Card[];
};

type Card = {
	id: number;
	desc: string;
};

//generate 4 different  description for the cards
const descriptions = ['Example ', 'Element ', 'Item ', 'Component '];

//generate 12 cards
const generatedCards: Card[] = Array.from({ length: 12 }, (_, i) => ({
	id: i,
	desc: descriptions[Math.floor(Math.random() * descriptions.length)] + (i + 1)
}));

export const cardStore = proxy<CardStore>({
	cards: generatedCards
});
