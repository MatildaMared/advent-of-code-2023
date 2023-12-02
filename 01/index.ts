import * as fs from "fs";
import * as path from "path";
import { NUMBERS } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 1 🎅 🎄
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = input.split("\n");

// 🍬 🍭 Part 1 🍭 🍬

let sumOfAllCalibrationValues = 0;

lines.forEach((line) => {
	const numbers = line
		.split("")
		.map((char) => parseInt(char))
		.filter((num) => !isNaN(num));
	const sum = numbers[0].toString() + numbers[numbers.length - 1].toString();
	sumOfAllCalibrationValues += parseInt(sum);
});

console.log(
	`🎄 🎅 The answer to part 1 is: ${sumOfAllCalibrationValues} 🍬 🍭`
);

// 🍬 🍭 Part 2 🍭 🍬

sumOfAllCalibrationValues = 0;

const allDigits: number[][] = [];

lines.forEach((line) => {
	let rowNumbers: number[] = [];
	let currentSequence = "";

	line.split("").forEach((character) => {
		// if it is a number
		if (!isNaN(parseInt(character))) {
			rowNumbers.push(parseInt(character));
		} else {
			currentSequence += character;
			// does the current sequence match a number in the numbers array?
			NUMBERS.forEach((number) => {
				if (currentSequence.includes(number)) {
					rowNumbers.push(NUMBERS.indexOf(number) + 1);
					// reset the current sequence but keep the last characters since it could be the start of a new number
					currentSequence = currentSequence[currentSequence.length - 1];
				}
			});
		}
	});
	allDigits.push(rowNumbers);
});

allDigits.forEach((rowOfDigits) => {
	const rowResult =
		rowOfDigits[0].toString() + rowOfDigits[rowOfDigits.length - 1].toString();
	sumOfAllCalibrationValues += parseInt(rowResult);
});

console.log(
	`🎄 🎅 The answer to part 2 is: ${sumOfAllCalibrationValues} 🍬 🍭`
);
