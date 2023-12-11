export enum Tile {
	Empty = ".",
	Galaxy = "#",
	Gap = "*",
}

export function findUniquePairs(numbers: number[]): number[][] {
	const numbersToPair = [...numbers];
	const pairs: number[][] = [];

	while (numbersToPair.length > 0) {
		const number = numbersToPair.shift();
		if (number) {
			numbersToPair.forEach((otherNumber) => {
				pairs.push([number, otherNumber]);
			});
		}
	}

	return pairs;
}

export function findShortestPath(
	grid: string[][],
	start: number,
	end: number,
	numberToExpand: number
): number {
	const startCoordinates = findCoordinates(grid, start);
	const endCoordinates = findCoordinates(grid, end);

	const xDistance = Math.abs(startCoordinates[0] - endCoordinates[0]);
	const yDistance = Math.abs(startCoordinates[1] - endCoordinates[1]);

	const numberOfGaps = findGapsBetweenCoordinates(grid, start, end);

  const shortestPath = xDistance + yDistance + numberOfGaps * numberToExpand - numberOfGaps;

	return shortestPath;
}

export function findGapsBetweenCoordinates(
	grid: string[][],
	start: number,
	end: number
): number {
	const startCoordinates = findCoordinates(grid, start);
	const endCoordinates = findCoordinates(grid, end);

	const startRow =
		startCoordinates[0] > endCoordinates[0]
			? endCoordinates[0]
			: startCoordinates[0];
	const endRow =
		startCoordinates[0] > endCoordinates[0]
			? startCoordinates[0]
			: endCoordinates[0];
	const startColumn =
		startCoordinates[1] > endCoordinates[1]
			? endCoordinates[1]
			: startCoordinates[1];
	const endColumn =
		startCoordinates[1] > endCoordinates[1]
			? startCoordinates[1]
			: endCoordinates[1];

	let numberOfGaps = 0;

	for (let i = startColumn; i < endColumn; i++) {
		const tile = grid[startRow][i];
		if (tile === Tile.Gap) {
			numberOfGaps++;
		}
	}

	for (let i = startRow; i < endRow; i++) {
		const tile = grid[i][startColumn];
		if (tile === Tile.Gap) {
			numberOfGaps++;
		}
	}

	return numberOfGaps;
}

export function findCoordinates(
	grid: string[][],
	galaxyNumber: number
): number[] {
	let coordinates: number[] = [];
	grid.forEach((row, rowIndex) => {
		row.forEach((tile, columnIndex) => {
			if (tile === galaxyNumber.toString()) {
				coordinates = [rowIndex, columnIndex];
			}
		});
	});

	return coordinates;
}

export function replaceGalaxiesWithNumbers(grid: string[][]) {
	let galaxyCount = 1;
	const galaxyNumbers: number[] = [];
	grid.forEach((row) => {
		row.forEach((tile, index) => {
			if (tile === Tile.Galaxy) {
				row[index] = galaxyCount.toString();
				galaxyNumbers.push(galaxyCount);
				galaxyCount++;
			}
		});
	});

	return galaxyNumbers;
}

export function expandGrid(grid: string[][]) {
	const rowsToExpand: Set<number> = new Set();
	const columnsToExpand: Set<number> = new Set();

	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];

		const emptyRow = isRowEmpty(row);
		if (emptyRow) {
			rowsToExpand.add(i);
		}

		for (let j = 0; j < row.length; j++) {
			const emptyColumn = isColumnEmpty(grid, j);
			if (emptyColumn) {
				columnsToExpand.add(j);
			}
		}
	}

	for (let i = 0; i < rowsToExpand.size; i++) {
		const rowIndex = Array.from(rowsToExpand)[i];
		expandRow(grid, rowIndex);
	}

	for (let i = 0; i < columnsToExpand.size; i++) {
		const columnIndex = Array.from(columnsToExpand)[i];
		expandColumn(grid, columnIndex);
	}

	return [rowsToExpand.size, columnsToExpand.size];
}

export function displayGrid(grid: string[][]) {
	console.log(grid.map((row) => row.join("")).join("\n"));
}

export function expandRow(grid: string[][], rowIndex: number) {
	const row = grid[rowIndex];
	const newRow = row.map(() => Tile.Gap);
	grid[rowIndex] = newRow;
}

export function expandColumn(grid: string[][], columnIndex: number) {
	grid.forEach((row) => {
		row[columnIndex] = Tile.Gap;
	});
}

export function isRowEmpty(row: string[]) {
	return row.every((tile) => tile === Tile.Empty);
}

export function isColumnEmpty(grid: string[][], columnIndex: number) {
	return grid.every((row) => row[columnIndex] === Tile.Empty);
}
