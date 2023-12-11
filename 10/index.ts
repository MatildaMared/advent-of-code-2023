import * as fs from "fs";
import * as path from "path";
import {
	Tile,
	VisitedPosition,
	findNextPossibleTiles,
	findStartingPosition,
	findSurroundingPipes,
	findTileType,
} from "./utils";
import { get } from "http";

// 🎄 🎅 Advent of Code 2023 Day 10 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const grid = input
	.split("\n")
	.map((line) => line.split(""))
	.filter((line) => line.length > 0);

// 🍬 🍭 Part 1 🍭 🍬

const startingPosition = findStartingPosition(grid);

const surroundingPositions = findSurroundingPipes(grid, startingPosition);

surroundingPositions.forEach((position) => {
	position.visitedPositions = [
		{
			x: startingPosition.x,
			y: startingPosition.y,
			tileType: startingPosition.value,
		},
	];
});

surroundingPositions.forEach((position) => {
	const gridCopy = grid.map((line) => line.map((tile) => tile));
	const positions = [position];

	while (positions.length > 0) {
		const currentPosition = positions.pop();
		if (currentPosition === undefined) continue;
		currentPosition.visitedPositions.push({
			x: currentPosition.x,
			y: currentPosition.y,
			tileType: currentPosition.value,
		});

		const surroundingPipes = findSurroundingPipes(gridCopy, currentPosition);

		const possibleNextTiles = findNextPossibleTiles(
			currentPosition,
			surroundingPipes
		).filter((tile) => {
			return !currentPosition.visitedPositions?.some(
				(visitedTile) => visitedTile.x === tile.x && visitedTile.y === tile.y
			);
		});

		possibleNextTiles.forEach((tile) => {
			tile.visitedPositions = currentPosition.visitedPositions;
		});

		positions.push(...possibleNextTiles);

		if (possibleNextTiles.some((tile) => tile.value === Tile.Start)) {
			console.log("Found the end!");
			console.log(currentPosition.visitedPositions.length / 2);
			const enclosedTiles = findEnclosedTiles(
				gridCopy,
				currentPosition.visitedPositions
			);
			console.log(enclosedTiles);
			break;
		}

		if (possibleNextTiles.length === 0) {
			console.log("No possible next tiles!");
			console.log(currentPosition.visitedPositions.length / 2);
			const enclosedTiles = findEnclosedTiles(
				gridCopy,
				currentPosition.visitedPositions
			);
			console.log(enclosedTiles);
			break;
		}
	}
});

function findEnclosedTiles(
	grid: string[][],
	visitedPositions: VisitedPosition[]
): number {
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (
				!visitedPositions.some(
					(visitedTile) => visitedTile.x === x && visitedTile.y === y
				)
			) {
				grid[y][x] = Tile.Empty;
			}
		}
	}
	let numberOfEnclosedTiles = 0;

	for (let y = 0; y < grid.length; y++) {
		const xPositions: VisitedPosition[] = grid[y]
			.map((tile, x) => ({ x, y, tileType: findTileType(tile) }))
			.filter(
				(position) =>
					position.tileType !== Tile.EastWest &&
					position.tileType !== Tile.Empty
			);

		for (let x = 0; x < xPositions.length; x++) {
			const xStart = xPositions[x];
			const xEnd = xPositions[x + 1];
			const numberOfNorthFacingToTheLeft = xPositions
				.slice(0, x + 1)
				.filter(
					(position) =>
						position.tileType === Tile.NorthSouth ||
						position.tileType === Tile.NorthWest ||
						position.tileType === Tile.NorthEast
				).length;

			if (!xEnd || numberOfNorthFacingToTheLeft % 2 === 0) continue;

			const enclosedTiles = grid[y]
				.slice(xStart.x, xEnd.x + 1)
				.filter((tile) => tile === Tile.Empty);
			numberOfEnclosedTiles += enclosedTiles.length;
		}
	}
	return numberOfEnclosedTiles;
}

console.log(`🎄 🎅 The answer to part 1 is: ${undefined} 🍬 🍭`);

// 🍬 🍭 Part 2 🍭 🍬

console.log(`🎄 🎅 The answer to part 2 is: ${undefined} 🍬 🍭`);
