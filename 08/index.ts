import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 8 🎅 🎄

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

let currentPosition = "AAA";
let numberOfSteps = 0;

// 🍬 🍭 Part 1 🍭 🍬

for (let i = 0; i < instructions.length; i++) {
	numberOfSteps++;
	const instruction = instructions[i];
	const node = nodes.find((node) => node.currentPosition === currentPosition);

	if (!node) throw new Error("Node not found for position: " + currentPosition);
	
	if (instruction === "L") {
		currentPosition = node.nextLeft;
	} else if (instruction === "R") {
		currentPosition = node.nextRight;
	} else {
		throw new Error("Unknown instruction");
	}

	if (currentPosition === "ZZZ") {
		console.log(`🎄 🎅 The answer to part 1 is: ${numberOfSteps} 🍬 🍭`);
		break;
	}

	if (i === instructions.length - 1) {
		i = -1;
		continue;
	}
}

interface Node {
	currentPosition: string;
	nextLeft: string;
	nextRight: string;
}
