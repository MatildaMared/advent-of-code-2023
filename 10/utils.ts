export interface VisitedPosition {
	x: number;
  y: number;
  tileType: Tile;
}

export interface Position {
	value: Tile;
	visitedPositions: VisitedPosition[];
	possibleNextTiles: Tile[];
	x: number;
	y: number;
}

export enum Tile {
	Empty = ".",
	NorthSouth = "|",
	EastWest = "-",
	NorthEast = "L",
	NorthWest = "J",
	SouthWest = "7",
	SouthEast = "F",
	Start = "S",
	Visited = "X",
}

export function findStartingPosition(grid: string[][]): Position {
	for (let y = 0; y < grid.length; y++) {
		if (grid[y] === undefined) continue;
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === undefined) continue;
			if (grid[y][x] === Tile.Start) {
				return {
					x,
					y,
					value: Tile.Start,
					possibleNextTiles: findPossibleNextTiles(Tile.Start),
					visitedPositions: [],
				};
			}
		}
	}
	throw new Error("No starting position found!");
}

export function findSurroundingPipes(
	grid: string[][],
	position: Position
): Position[] {
	const positions: Position[] = [];
	const { x, y } = position;

	// North
	if (grid[y - 1] !== undefined) {
		positions.push({
			x,
			y: y - 1,
			value: findTileType(grid[y - 1][x]),
			possibleNextTiles: findPossibleNextTiles(findTileType(grid[y - 1][x])),
			visitedPositions: [],
		});
	}

	// South
	if (grid[y + 1] !== undefined) {
		positions.push({
			x,
			y: y + 1,
			value: findTileType(grid[y + 1][x]),
			possibleNextTiles: findPossibleNextTiles(findTileType(grid[y + 1][x])),
			visitedPositions: [],
		});
	}

	// East
	if (grid[y][x + 1] !== undefined) {
		positions.push({
			x: x + 1,
			y,
			value: findTileType(grid[y][x + 1]),
			possibleNextTiles: findPossibleNextTiles(findTileType(grid[y][x + 1])),
			visitedPositions: [],
		});
	}

	// West
	if (grid[y][x - 1] !== undefined) {
		positions.push({
			x: x - 1,
			y,
			value: findTileType(grid[y][x - 1]),
			possibleNextTiles: findPossibleNextTiles(findTileType(grid[y][x - 1])),
			visitedPositions: [],
		});
	}

	return positions.filter((position) => position.value !== Tile.Empty);
}

export function findTileType(possibleType: string): Tile {
	switch (possibleType) {
		case Tile.Empty:
			return Tile.Empty;
		case Tile.NorthSouth:
			return Tile.NorthSouth;
		case Tile.EastWest:
			return Tile.EastWest;
		case Tile.NorthEast:
			return Tile.NorthEast;
		case Tile.NorthWest:
			return Tile.NorthWest;
		case Tile.SouthWest:
			return Tile.SouthWest;
		case Tile.SouthEast:
			return Tile.SouthEast;
		case Tile.Start:
			return Tile.Start;
		case Tile.Visited:
			return Tile.Visited;
		default:
			throw new Error(`Unknown tile type: ${possibleType}`);
	}
}

export function findPossibleNextTiles(tile: Tile): Tile[] {
	switch (tile) {
		case Tile.NorthSouth:
			return [Tile.NorthSouth, Tile.NorthEast, Tile.NorthWest, Tile.Start];
		case Tile.EastWest:
			return [
				Tile.EastWest,
				Tile.SouthWest,
				Tile.SouthEast,
				Tile.NorthEast,
				Tile.NorthWest,
				Tile.Start,
			];
		case Tile.NorthEast:
			return [
				Tile.NorthSouth,
				Tile.EastWest,
				Tile.NorthWest,
				Tile.SouthEast,
				Tile.Start,
			];
		case Tile.NorthWest:
			return [
				Tile.NorthSouth,
				Tile.EastWest,
				Tile.NorthEast,
				Tile.SouthWest,
				Tile.Start,
			];
		case Tile.SouthWest:
			return [
				Tile.NorthSouth,
				Tile.EastWest,
				Tile.NorthWest,
				Tile.SouthEast,
				Tile.Start,
			];
		case Tile.SouthEast:
			return [
				Tile.NorthSouth,
				Tile.EastWest,
				Tile.NorthEast,
				Tile.SouthWest,
				Tile.Start,
			];
		case Tile.Start:
			return [
				Tile.NorthSouth,
				Tile.EastWest,
				Tile.NorthEast,
				Tile.NorthWest,
				Tile.SouthWest,
				Tile.SouthEast,
			];
		default:
			return [];
	}
}

export function findNextPossibleTiles(
	position: Position,
	possibleNextTiles: Position[]
): Position[] {
	switch (position.value) {
		case Tile.NorthSouth:
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y + 1) ||
					(tile.x === position.x && tile.y === position.y - 1)
			);
		case Tile.EastWest:
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x + 1 && tile.y === position.y) ||
					(tile.x === position.x - 1 && tile.y === position.y)
			);
		case Tile.NorthEast:
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y - 1) ||
					(tile.x === position.x + 1 && tile.y === position.y)
			);
		case Tile.NorthWest:
			// next tile is either north or west
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y - 1) ||
					(tile.x === position.x - 1 && tile.y === position.y)
			);
		case Tile.SouthWest:
			// next tile is either south or west
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y + 1) ||
					(tile.x === position.x - 1 && tile.y === position.y)
			);
		case Tile.SouthEast:
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y + 1) ||
					(tile.x === position.x + 1 && tile.y === position.y)
			);
		case Tile.Start:
			return possibleNextTiles.filter(
				(tile) =>
					(tile.x === position.x && tile.y === position.y + 1) ||
					(tile.x === position.x && tile.y === position.y - 1) ||
					(tile.x === position.x + 1 && tile.y === position.y) ||
					(tile.x === position.x - 1 && tile.y === position.y)
			);
		default:
			return [];
	}
}
