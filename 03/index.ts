import * as fs from "fs";
import * as path from "path";
import {
	getEntireNumber,
	getSurroundingValues,
	isGear,
	isNumber,
	isSymbol,
} from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 1 🎅 🎄
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const matrix = input.split("\n").map((line) => line.split(""));

// 🍬 🍭 Part 1 🍭 🍬

let total = 0;

matrix.forEach((row, rowIndex) => {
	for (let i = 0; i < row.length; i++) {
		if (isNumber(row[i])) {
			let numberToAdd = getEntireNumber(i, rowIndex, matrix);

			let hasSymbolAdjacent = false;

			for (let j = 0; j < numberToAdd.length; j++) {
				const currentIndexInArray = i + j;
				const adjecantValues = getSurroundingValues(
					currentIndexInArray,
					rowIndex,
					matrix
				);
				adjecantValues.forEach((value) => {
					if (isSymbol(value.value)) {
						hasSymbolAdjacent = true;
					}
				});
			}

			if (hasSymbolAdjacent) {
				total += Number(numberToAdd);
			}
			i = i + numberToAdd.length - 1;
		}
	}
});

console.log(`🎄 🎅 The answer to part 1 is: ${total} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

let result = 0;

matrix.forEach((row, rowIndex) => {
	for (let i = 0; i < row.length; i++) {
		const currentValue = row[i];
		if (isGear(currentValue)) {
			const adjecantValues = getSurroundingValues(i, rowIndex, matrix);
			let adjacentNumbers: number[] = [];
			for (let j = 0; j < adjecantValues.length; j++) {
				if (isNumber(adjecantValues[j].value)) {
					const entireNumber = getEntireNumber(
						adjecantValues[j].placement.x,
						adjecantValues[j].placement.y,
						matrix
					);
					adjacentNumbers.push(Number(entireNumber));
					const nextValue = adjecantValues.find(
						(value) =>
							value.placement.x === adjecantValues[j].placement.x + 1 &&
							value.placement.y === adjecantValues[j].placement.y
					);
					if (nextValue && isNumber(nextValue.value)) {
						const nextValue = adjecantValues.find(
							(value) =>
								value.placement.x === adjecantValues[j].placement.x + 2 &&
								value.placement.y === adjecantValues[j].placement.y
						);
						if (nextValue && isNumber(nextValue.value)) {
							j += 2;
						} else {
							j++;
						}
					}
				}
			}

			if (adjacentNumbers.length === 2) {
				result += adjacentNumbers[0] * adjacentNumbers[1];
			}
		}
	}
});

console.log(`🎄 🎅 The answer to part 2 is: ${result} 🍬 🍭`);

// Utils
