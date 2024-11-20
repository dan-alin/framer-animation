import { proxy } from 'valtio';

type CardStore = {
	cards: Card[];
};

type Card = {
	id: number;
	desc: string;
};

//generate 3 different  description for the cards
const descriptions = [
	'This is a sample description for card  ',
	'Here you can find information about card  ',
	'There it is card  '
];

//generate 12 cards
const generatedCards: Card[] = Array.from({ length: 9 }, (_, i) => ({
	id: i,
	desc: descriptions[Math.floor(Math.random() * descriptions.length)] + (i + 1)
}));

export const cardStore = proxy<CardStore>({
	cards: generatedCards
});
