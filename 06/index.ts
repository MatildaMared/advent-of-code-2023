import * as fs from "fs";
import * as path from "path";
import { Race, calculateNumberOfPossibleWins } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 6 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const line = input
	.split("\n")
	.map((line) => line.split(" "))
	.filter((line) => line.length > 1);

const timeValues: number[] = line[0]
	.filter((char) => char !== "")
	.filter((char) => Number.isNaN(Number(char)) === false)
	.map((char) => Number(char));

const distanceValues: number[] = line[1]
	.filter((char) => char !== "")
	.filter((char) => Number.isNaN(Number(char)) === false)
	.map((char) => Number(char));

const races: Race[] = [];

for (let i = 0; i < timeValues.length; i++) {
	const race = {
		time: timeValues[i],
		currentRecord: distanceValues[i],
	};

	races.push(race);
}

// 🍬 🍭 Part 1 🍭 🍬

let possibleWinsPerRace: number[] = [];

races.forEach((race) => {
	const racesThatCanBeWon = calculateNumberOfPossibleWins(race);
	possibleWinsPerRace.push(racesThatCanBeWon);
});

const part1 = possibleWinsPerRace.reduce((a, b) => a * b);

console.log(`🎄 🎅 The answer to part 1 is: ${part1} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

const singleRace: Race = {
	time: Number(timeValues.map((time) => time.toString()).join("")),
	currentRecord: Number(
		distanceValues.map((distance) => distance.toString()).join("")
	),
};

const numberOfPossibleWinsForTheBigRace =
	calculateNumberOfPossibleWins(singleRace);

console.log(
	`🎄 🎅 The answer to part 2 is: ${numberOfPossibleWinsForTheBigRace} 🍬 🍭`
);
