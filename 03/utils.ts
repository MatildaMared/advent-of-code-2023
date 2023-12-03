export function isNumber(value: string) {
	return !isNaN(Number(value));
}

export function isSymbol(value: string) {
	return !isNumber(value) && value !== "." && value !== undefined;
}

export function isGear(value: string) {
	return value === "*";
}

export interface Coordinate {
	x: number;
	y: number;
}

export interface AdjecantValue {
	value: string;
	placement: Coordinate;
}

export function getSurroundingValues(
	x: number,
	y: number,
	matrix: string[][]
): AdjecantValue[] {
	return [
		{ value: matrix[y - 1]?.[x - 1], placement: { x: x - 1, y: y - 1 } },
		{ value: matrix[y - 1]?.[x], placement: { x: x, y: y - 1 } },
		{ value: matrix[y - 1]?.[x + 1], placement: { x: x + 1, y: y - 1 } },
		{ value: matrix[y]?.[x - 1], placement: { x: x - 1, y: y } },
		{ value: matrix[y]?.[x + 1], placement: { x: x + 1, y: y } },
		{ value: matrix[y + 1]?.[x - 1], placement: { x: x - 1, y: y + 1 } },
		{ value: matrix[y + 1]?.[x], placement: { x: x, y: y + 1 } },
		{ value: matrix[y + 1]?.[x + 1], placement: { x: x + 1, y: y + 1 } },
	];
}

export function getEntireNumber(x: number, y: number, matrix: string[][]) {
	let number = matrix[y][x];
	let entireNumber = "";
	let currentPosition = x;

	while (isNumber(matrix[y][currentPosition])) {
		currentPosition--;
	}

	currentPosition += 1;

	while (isNumber(matrix[y][currentPosition])) {
		entireNumber = entireNumber + matrix[y][currentPosition];
		currentPosition++;
	}

	return entireNumber;
}
