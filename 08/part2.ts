import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 8 🎅 🎄

// 🍬 🍭 Part 2 🍭 🍬

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const parsed = input.split("\n").filter((line) => line.length > 0);
const instructions = parsed.shift()?.split("") ?? [];

const nodes: Node[] = parsed.map((line) => {
	const [currentPosition, rest] = line.split(" = ");
	return {
		currentPosition,
		nextLeft: rest.slice(1, 4),
		nextRight: rest.slice(6, 9),
	};
});


let positions = nodes
	.filter((node) => node.currentPosition.endsWith("A"))
	.map((node) => node.currentPosition);

console.log(positions);

const numberOfStepsToComplete: number[] = [];

positions.forEach((position) => {
	let numberOfSteps = 0;
	let currentPosition = position;

	for (let i = 0; i < instructions.length; i++) {
		numberOfSteps++;
		const instruction = instructions[i];
		const node = nodes.find((node) => node.currentPosition === currentPosition);

		if (!node)
			throw new Error("Node not found for position: " + currentPosition);

		if (instruction === "L") {
			currentPosition = node.nextLeft;
		} else if (instruction === "R") {
			currentPosition = node.nextRight;
		} else {
			throw new Error("Unknown instruction");
		}

		if (currentPosition.endsWith("Z")) {
			numberOfStepsToComplete.push(numberOfSteps);
			break;
		}

		if (i === instructions.length - 1) {
			i = -1;
			continue;
		}
	}
});

console.log(numberOfStepsToComplete);

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);

const findLeastCommonMultiplier = (a: number, b: number): number => (a * b) / gcd(a, b);

let result = numberOfStepsToComplete.reduce(findLeastCommonMultiplier);

console.log(`🎄 🎅 The answer to part 2 is: ${result} 🍬 🍭`);

// utils

interface Node {
	currentPosition: string;
	nextLeft: string;
	nextRight: string;
}
