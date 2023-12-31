import * as fs from "fs";
import * as path from "path";
import { findNextValue, getSequences } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 9 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const histories = input
	.split("\n")
	.map((line) => line.split(" "))
	.filter((line) => line.length > 1)
	.map((line) => line.map((number) => Number(number)));

// 🍬 🍭 Part 1 🍭 🍬

const nextValues: number[] = [];

histories.forEach((history) => {
	const sequences = getSequences(history);
	const nextValue = findNextValue(sequences);
	nextValues.push(nextValue);
});

const result = nextValues.reduce((sum, value) => sum + value, 0);

console.log(`🎄 🎅 The answer to part 1 is: ${result} 🍬 🍭`);
