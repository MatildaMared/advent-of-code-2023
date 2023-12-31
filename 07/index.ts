import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 7 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const line = input.split("\n");

// 🍬 🍭 Part 1 🍭 🍬

const hands: CardHand[] = [];

line.forEach((line) => {
	const [cards, bid] = line.split(" ");
	const hand: CardHand = {
		cards: cards.split(""),
		bid: Number(bid),
		typeNumber: 0,
	};

	if (cards.length === 5) {
		hands.push(hand);
	}
});

hands.forEach((hand) => {
	if (hand.cards.length !== 5) {
		return;
	}
	hand.type = getCardType(hand);
	hand.typeNumber = getCardTypeNumber(hand);
});

hands
	.sort((a: CardHand, b: CardHand): number => findOutOrder(a, b))
	.forEach((hand, index) => {
		hand.rank = index + 1;
	});

const totalWinnings = hands.reduce((acc, hand) => {
	if (!hand.rank) {
		return acc;
	}
	return acc + hand.bid * hand.rank;
}, 0);

console.log(hands);

console.log(`🎄 🎅 The answer to part 1 is: ${totalWinnings} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

console.log(`🎄 🎅 The answer to part 2 is: ${undefined} 🍬 🍭`);

interface CardHand {
	cards: string[];
	type?: HandType;
	typeNumber: number;
	rank?: number;
	bid: number;
}
type HandType =
	| "FIVE_OF_A_KIND"
	| "FOUR_OF_A_KIND"
	| "FULL_HOUSE"
	| "THREE_OF_A_KIND"
	| "TWO_PAIR"
	| "ONE_PAIR"
	| "HIGH_CARD";

function getCardTypeNumber(hand: CardHand): number {
	switch (hand.type) {
		case "FIVE_OF_A_KIND":
			return 7;
		case "FOUR_OF_A_KIND":
			return 6;
		case "FULL_HOUSE":
			return 5;
		case "THREE_OF_A_KIND":
			return 4;
		case "TWO_PAIR":
			return 3;
		case "ONE_PAIR":
			return 2;
		case "HIGH_CARD":
			return 1;
		default:
			return 0;
	}
}

function getCardType(hand: CardHand): HandType {
	const counts = getCounts(hand.cards);

	if (counts[0].amount === 5) {
		return "FIVE_OF_A_KIND";
	} else if (counts[0].amount === 4) {
		return "FOUR_OF_A_KIND";
	} else if (counts[0].amount === 3 && counts[1].amount === 2) {
		return "FULL_HOUSE";
	} else if (counts[0].amount === 3) {
		return "THREE_OF_A_KIND";
	} else if (counts[0].amount === 2 && counts[1].amount === 2) {
		return "TWO_PAIR";
	} else if (counts[0].amount === 2) {
		return "ONE_PAIR";
	} else {
		return "HIGH_CARD";
	}
}

interface CardCount {
	type: string;
	amount: number;
}

function getCounts(cards: string[]): CardCount[] {
	const counts: CardCount[] = [];
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		const count = counts.find((c) => c.type === card);
		if (count) {
			count.amount++;
		} else {
			counts.push({ type: card, amount: 1 });
		}
	}

	return counts.sort((a, b) => b.amount - a.amount);
}

function findOutOrder(a: CardHand, b: CardHand) {
	if (a.typeNumber !== b.typeNumber) {
		if (a.typeNumber > b.typeNumber) {
			console.log(a, " comes before ", b);
			return 1;
		} else if (b.typeNumber > a.typeNumber) {
			console.log(a, " comes after ", b);
			return -1;
		}
	}
	for (let i = 0; i < a.cards.length; i++) {
		const aCardScore = getCardScore(a.cards[i]);
		const bCardScore = getCardScore(b.cards[i]);
		if (aCardScore !== bCardScore) {
			if (aCardScore > bCardScore) {
				console.log(a, " comes before ", b);
				return 1;
			} else if (bCardScore > aCardScore) {
				console.log(a, " comes after ", b);
				return -1;
			}
		}
	}

	return 1;
}

function getCardScore(card: string): number {
	switch (card) {
		case "A":
			return 14;
		case "K":
			return 13;
		case "Q":
			return 12;
		case "J":
			return 11;
		case "T":
			return 10;
		default:
			return Number(card);
	}
}
