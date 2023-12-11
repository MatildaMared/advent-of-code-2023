import * as fs from "fs";
import * as path from "path";
import {
	expandGrid,
	findShortestPath,
	findUniquePairs,
	replaceGalaxiesWithNumbers,
} from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 11 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const grid = input
	.split("\n")
	.filter((line) => line.length > 0)
	.map((line) => line.split(""));

// 🍬 🍭 Part 1 🍭 🍬

expandGrid(grid);
const allGalaxyNumbers = replaceGalaxiesWithNumbers(grid);
const uniquePairs = findUniquePairs(allGalaxyNumbers);

let part1 = 0;

uniquePairs.forEach((pair) => {
	const numberOfSteps = findShortestPath(grid, pair[0], pair[1], 2);
	part1 += numberOfSteps;
});

console.log(`🎄 🎅 The answer to part 1 is: ${part1} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

let part2 = 0;

uniquePairs.forEach((pair) => {
	const numberOfSteps = findShortestPath(grid, pair[0], pair[1], 1000000);
	part2 += numberOfSteps;
});

console.log(`🎄 🎅 The answer to part 2 is: ${part2} 🍬 🍭`);
