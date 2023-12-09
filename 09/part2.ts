import * as fs from "fs";
import * as path from "path";
import { findFirstValue, getSequences } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 9 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const histories = input
	.split("\n")
	.map((line) => line.split(" "))
	.filter((line) => line.length > 1)
	.map((line) => line.map((number) => Number(number)));

// 🍬 🍭 Part 2 🍭 🍬

const firstValues: number[] = [];

histories.forEach((history) => {
	const sequences = getSequences(history);
	const firstValue = findFirstValue(sequences);
	firstValues.push(firstValue);
});

const result = firstValues.reduce((sum, value) => sum + value, 0);

console.log(`🎄 🎅 The answer to part 2 is: ${result} 🍬 🍭`);
