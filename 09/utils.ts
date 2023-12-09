export function getSequences(startingSequence: number[]): number[][] {
	const sequences = [[...startingSequence]];

	for (let i = 0; i < sequences.length; i++) {
		if (sequences[i].length === 1) {
			break;
		}
		const currentSequence = sequences[i];
		if (currentSequence.every((value) => value === 0)) {
			break;
		}
		const nextSequence: number[] = [];

		for (let j = 0; j < currentSequence.length - 1; j++) {
			const currentNumber = currentSequence[j];
			const nextNumber = currentSequence[j + 1];
			const difference = nextNumber - currentNumber;
			nextSequence.push(difference);
		}
		sequences.push(nextSequence);
	}

	return sequences;
}

export function findNextValue(sequences: number[][]): number {
	for (let i = sequences.length - 1; i >= 0; i--) {
		const currentSequence = sequences[i];
		if (i === sequences.length - 1) {
			currentSequence.push(0);
			continue;
		}

		const previousSequence = sequences[i + 1];

		const valueToTheLeft = currentSequence[currentSequence.length - 1];
		const valueBelow = previousSequence[currentSequence.length - 1];
		const nextValue = valueToTheLeft + valueBelow;
		currentSequence.push(nextValue);
	}

	return sequences[0][sequences[0].length - 1];
}

export function findFirstValue(sequences: number[][]): number {
	for (let i = sequences.length - 1; i >= 0; i--) {
		const currentSequence = sequences[i];
		if (i === sequences.length - 1) {
			currentSequence.unshift(0);
			continue;
		}

		const previousSequence = sequences[i + 1];

		const valueToTheRight = currentSequence[0];
		const valueBelow = previousSequence[0];
		const nextValue = valueToTheRight - valueBelow;
		currentSequence.unshift(nextValue);
	}

	return sequences[0][0];
}
