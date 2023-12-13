import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 12 🎅 🎄

enum Condition {
	Operational = ".",
	Damaged = "#",
	Unknown = "?",
}

interface Input {
	groups: number[];
	record: string[];
}

const data = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = data.split("\n").filter((line) => line.length > 0);

let allInput: Input[] = [];

let input = lines.map((line) => line.split(" "));
input.forEach((line) => {
	console.log(line[0]);
	const record = line[0].split("");
	const groups = line[1].split(",").map((num) => Number(num));
	const input: Input = {
		groups,
		record,
	};
	allInput.push(input);
});

// 🍬 🍭 Part 1 🍭 🍬

allInput.forEach((input) => {
	const numberOfPossibleInputs = 0;
	console.log(input);
	findPossibleInputs(input);

	function findPossibleInputs(input: Input) {
		let currentGroupIndex = 0;
		let currentGroup = input.groups[currentGroupIndex];
		console.log("Current group: ", currentGroup);

		for (let i = 0; i < input.record.length; i++) {
			const currentCharacter = input.record[i];
			if (currentCharacter === Condition.Operational) {
				continue;
			} else if (currentCharacter === Condition.Damaged) {
				console.log(
					"Found group, needs to be at least ",
					currentGroup,
					" characters long"
				);
				let currentGroupLength = 1;

				for (let j = 0; j < currentGroup; j++) {
					console.log("In loop");
					if (input.record[i + j] === Condition.Operational) {
						console.log("Found operational character");
						currentGroupLength++;
					}
				}

				console.log("Current group length: ", currentGroupLength);
			}
		}
	}
});

interface Group {
	startIndex: number;
	endIndex: number;
}

console.log(`🎄 🎅 The answer to part 1 is: ${null} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

console.log(`🎄 🎅 The answer to part 2 is: ${null} 🍬 🍭`);
