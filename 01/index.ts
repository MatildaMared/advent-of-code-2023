import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 1 🎅 🎄
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = input.split("\n");

// 🍬 🍭 Part 1 🍭 🍬
let firstAnswer = 0;
lines.forEach((line) => {
	const split = line.split("");
	const numbers = split
		.map((char) => parseInt(char))
		.filter((num) => !isNaN(num));
	const sum = numbers[0].toString() + numbers[numbers.length - 1].toString();
	firstAnswer += parseInt(sum);
});
console.log(`The answer to part 1 is: ${firstAnswer} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬
const numbers = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const numbers2: number[][] = [];
lines.forEach((line, index) => {
	let rowNumbers: number[] = [];
	const characters = line.split("");
	let currentSequence = "";
	characters.forEach((character) => {
		// if it is a number
		if (!isNaN(parseInt(character))) {
			rowNumbers.push(parseInt(character));
		} else {
			currentSequence += character;
			// does the current sequence match a number in the numbers array?
			numbers.forEach((number) => {
				if (currentSequence.includes(number)) {
					rowNumbers.push(numbers.indexOf(number) + 1);
					currentSequence = currentSequence[currentSequence.length - 1];
				}
			});
		}
	});
	numbers2.push(rowNumbers);
});

let secondAnswer = 0;

numbers2.forEach((row) => {
	const rowResult = row[0].toString() + row[row.length - 1].toString();
	secondAnswer += parseInt(rowResult);
});
console.log(`The answer to part 2 is: ${secondAnswer} 🍬 🍭`);
