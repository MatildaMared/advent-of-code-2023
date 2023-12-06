export interface Race {
	time: number;
	currentRecord: number;
}

export function calculateNumberOfPossibleWins(race: Race): number {
	let numberOfRacesWon = 0;

	for (let i = 0; i <= race.time; i++) {
		const distancePerMilliSeconds = i;
		const milliSecondsLeftAfterPushingTheButton = race.time - i;

		const totalDistance =
			distancePerMilliSeconds * milliSecondsLeftAfterPushingTheButton;

		if (totalDistance > race.currentRecord) {
			numberOfRacesWon++;
		}
	}

	return numberOfRacesWon;
}
