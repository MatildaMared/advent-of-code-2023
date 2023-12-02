import * as fs from "fs";
import * as path from "path";

// 🎄 🎅 Advent of Code 2023 Day 1 🎅 🎄
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = input.split("\n");

interface GameData {
	games: Game[];
}

interface Game {
	blue: number;
	red: number;
	green: number;
}

const games = new Map<number, GameData>();

lines.forEach((line) => {
	const [title, data] = line.split(":");
	const gameId = parseInt(title.split(" ")[1]);
	const dataForOneGame = data.split(";");
	const gamesData: Game[] = [];

	dataForOneGame.forEach((data) => {
		const colors = data.split(", ");

		const gameData: Game = {
			blue: 0,
			red: 0,
			green: 0,
		};

		colors.forEach((color) => {
			const [amount, colorValue] = color.trim().split(" ");
			gameData[colorValue as keyof Game] = parseInt(amount.trim());
		});

		gamesData.push(gameData);
	});

	games.set(gameId, {
		games: gamesData,
	});
});

const maxNumberOfRed = 12;
const maxNumberOfGreen = 13;
const maxNumberOfBlue = 14;

const gameIdsThatArePossible: Set<number> = new Set();

games.forEach((gameData, gameId) => {
	const games = gameData.games;
	let gameIsPossible = true;

	games.forEach((game) => {
		if (
			game.red > maxNumberOfRed ||
			game.green > maxNumberOfGreen ||
			game.blue > maxNumberOfBlue
		) {
			gameIsPossible = false;
		}
	});

	if (gameIsPossible) {
		gameIdsThatArePossible.add(gameId);
	}
});

console.log(gameIdsThatArePossible);

const sumOfAllPossibleGameIds = Array.from(gameIdsThatArePossible).reduce(
	(acc, curr) => acc + curr,
	0
);

console.log(sumOfAllPossibleGameIds);

// 🍬 🍭 Part 1 🍭 🍬

console.log(sumOfAllPossibleGameIds);

// 🍬 🍭 Part 2 🍭 🍬

const powersOfTheSets: number[] = [];

games.forEach((gameData, gameId) => {
	const games = gameData.games;
	let fewestRedPossible = 0;
	let fewestGreenPossible = 0;
	let fewestBluePossible = 0;

	games.forEach((game) => {
		if (game.red > fewestRedPossible) {
			fewestRedPossible = game.red;
		}
		if (game.green > fewestGreenPossible) {
			fewestGreenPossible = game.green;
		}
		if (game.blue > fewestBluePossible) {
			fewestBluePossible = game.blue;
		}
	});
	console.log(
		"red: ",
		fewestRedPossible,
		"green: ",
		fewestGreenPossible,
		"blue: ",
		fewestBluePossible
	);

	powersOfTheSets.push(fewestRedPossible * fewestGreenPossible * fewestBluePossible);
});

const totalPowersOfTheSets = powersOfTheSets.reduce(
	(acc, curr) => acc + curr,
	0
);
console.log(totalPowersOfTheSets);
