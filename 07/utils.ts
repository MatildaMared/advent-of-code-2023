export interface CardHand {
	cards: string[];
	type?: HandType;
	typeNumber: number;
	rank?: number;
	bid: number;
}
export type HandType =
	| "FIVE_OF_A_KIND"
	| "FOUR_OF_A_KIND"
	| "FULL_HOUSE"
	| "THREE_OF_A_KIND"
	| "TWO_PAIR"
	| "ONE_PAIR"
	| "HIGH_CARD";
