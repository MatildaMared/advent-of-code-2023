import {
	MAX_NUMBER_OF_BLUE,
	MAX_NUMBER_OF_GREEN,
	MAX_NUMBER_OF_RED,
	getFormattedGameData,
} from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 2 🎅 🎄

// 🍬 🍭 Part 1 🍭 🍬

const gamesData = getFormattedGameData();

const gameIdsThatArePossible: Set<number> = new Set();

gamesData.forEach((gameData, gameId) => {
	const games = gameData.games;
	let gameIsPossible = true;

	games.forEach((game) => {
		if (
			game.red > MAX_NUMBER_OF_RED ||
			game.green > MAX_NUMBER_OF_GREEN ||
			game.blue > MAX_NUMBER_OF_BLUE
		) {
			gameIsPossible = false;
		}
	});

	if (gameIsPossible) {
		gameIdsThatArePossible.add(gameId);
	}
});

const sumOfAllPossibleGameIds = Array.from(gameIdsThatArePossible).reduce(
	(acc, curr) => acc + curr,
	0
);

console.log(`🎄 🎅 The answer to part 1 is: ${sumOfAllPossibleGameIds} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

const powersOfTheSets: number[] = [];

gamesData.forEach((gameData) => {
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

	powersOfTheSets.push(
		fewestRedPossible * fewestGreenPossible * fewestBluePossible
	);
});

const sumOfAllPowers = powersOfTheSets.reduce((acc, curr) => acc + curr, 0);

console.log(`🎄 🎅 The answer to part 2 is: ${sumOfAllPowers} 🍬 🍭`);
