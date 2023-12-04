import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 1 🎅 🎄
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const cards = input.split("\n").filter((n) => n);

const totalScratchCards = cards.map(() => 1);

// // 🍬 🍭 Part 1 🍭 🍬

let totalPoints = 0;

cards.forEach((card, index) => {
	const [winningNumbers, scratchedNumbers] = card
		.split(": ")[1]
		.split("| ")
		.map((n) =>
			n
				.trim()
				.split(" ")
				.map((n) => Number(n))
				.filter((n) => n !== 0)
		);

	let matches = winningNumbers.filter((n) => scratchedNumbers.includes(n));

	totalPoints += matches.length > 0 ? 1 * Math.pow(2, matches.length - 1) : 0;

	matches.forEach((match, matchIndex) => {
		totalScratchCards[index + matchIndex + 1] =
			totalScratchCards[index + matchIndex + 1] + totalScratchCards[index];
	});
});

console.log(`🎄 🎅 The answer to part 1 is: ${totalPoints} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

const totalNumberOfScratchCards = totalScratchCards.reduce((a, b) => a + b, 0);

console.log(
	`🎄 🎅 The answer to part 2 is: ${totalNumberOfScratchCards} 🍬 🍭`
);

// Utils
