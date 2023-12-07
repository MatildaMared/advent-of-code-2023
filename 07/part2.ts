import * as fs from "fs";
import * as path from "path";
import { CardHand, HandType } from "./utils";

console.time("Time");

// 🎄 🎅 Advent of Code 2023 Day 7 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const line = input.split("\n");

// 🍬 🍭 Part 2 🍭 🍬

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

console.log(`🎄 🎅 The answer to part 2 is: ${totalWinnings} 🍬 🍭`);

console.timeEnd("Time");

function getCardTypeNumber(hand: CardHand): number {
	switch (hand.type) {
		case "FIVE_OF_A_KIND":
			return 8;
		case "FOUR_OF_A_KIND":
			return 7;
		case "FULL_HOUSE":
			return 6;
		case "THREE_OF_A_KIND":
			return 5;
		case "TWO_PAIR":
			return 4;
		case "ONE_PAIR":
			return 3;
		case "HIGH_CARD":
			return 2;
		default:
			return 1;
	}
}

function numberOfJokers(cards: string[]): number {
	return cards.filter((card) => card === "J").length;
}

function getCardType(hand: CardHand): HandType {
	const counts = getCounts(hand.cards);
	let jokers = numberOfJokers(hand.cards);
	console.log("Counts: ", counts, ", Jokers: ", jokers);

	const most = counts[0]?.amount ? counts[0]?.amount + jokers : jokers;
	const secondMost =
		counts[0]?.amount && counts[1]?.amount ? counts[1]?.amount : 0;

	if (most >= 5) {
		return "FIVE_OF_A_KIND";
	} else if (most === 4) {
		return "FOUR_OF_A_KIND";
	} else if (most === 3 && secondMost === 2) {
		return "FULL_HOUSE";
	} else if (most === 3) {
		return "THREE_OF_A_KIND";
	} else if (most === 2 && secondMost === 2) {
		return "TWO_PAIR";
	} else if (most === 2) {
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
		if (card === "J") {
			continue;
		}
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
	if (a.typeNumber > b.typeNumber) {
		return 1;
	}
	if (a.typeNumber < b.typeNumber) {
		return -1;
	}
	for (let i = 0; i < a.cards.length; i++) {
		const aCardScore = getCardScore(a.cards[i]);
		const bCardScore = getCardScore(b.cards[i]);
		if (aCardScore !== bCardScore) {
			return aCardScore > bCardScore ? 1 : -1;
		} else {
			continue;
		}
	}

	return 0;
}

function getCardScore(card: string): number {
	switch (card) {
		case "A":
			return 13;
		case "K":
			return 12;
		case "Q":
			return 11;
		case "T":
			return 10;
		case "J":
			return 1;
		default:
			return Number(card);
	}
}
