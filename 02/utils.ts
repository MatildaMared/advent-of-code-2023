import * as fs from "fs";
import * as path from "path";

export interface GameData {
	games: Game[];
}

export interface Game {
	blue: number;
	red: number;
	green: number;
}

export const MAX_NUMBER_OF_RED = 12;
export const MAX_NUMBER_OF_GREEN = 13;
export const MAX_NUMBER_OF_BLUE = 14;

export function getFormattedGameData() {
	const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
	const lines = input.split("\n");
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

	return games;
}
