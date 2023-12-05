// @ts-nocheck
import * as fs from "fs";
import * as path from "path";
import { Input } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 5 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = input.split("\n\n");

const data: Input = {
	seeds: [],
	"seed-to-soil": [],
	"soil-to-fertilizer": [],
	"fertilizer-to-water": [],
	"water-to-light": [],
	"light-to-temperature": [],
	"temperature-to-humidity": [],
	"humidity-to-location": [],
};

Object.keys(data).forEach((key, index) => {
	const correspondingData = lines[index];
	if (correspondingData === undefined) {
		throw new Error(`No data found for ${key}`);
	}
	const numbers = correspondingData
		.split(":")[1]
		?.trim()
		.split("\n")
		.map((line) => line.split(" ").map((num) => parseInt(num)));
	if (key === "seeds") {
		data[key] = numbers[0];
	} else {
		data[key]?.push(...numbers);
	}
});
const ranges: Range[] = [];

for (let i = 0; i < data.seeds.length; i = i + 2) {
	const seed = data.seeds[i];
	const range = data.seeds[i + 1];
	ranges.push({ start: seed, end: seed + range });
}

for (let i = 0; i < 100000000; i++) {
	console.log("Finding seed for location : ", i);
	const seedDetails: SeedDetails = {
		location: i,
		humidity: 0,
		temperature: 0,
		light: 0,
		water: 0,
		fertilizer: 0,
		soil: 0,
		seed: 0,
	};

	Object.keys(data)
		.reverse()
		.forEach((key) => {
			if (key === "seeds") {
				return;
			}

			const sourceKey = key.split("-")[2];
			const destinationKey = key.split("-")[0];

			const sourceObj = data[key] as number[][];

			for (let i = 0; i < sourceObj.length; i++) {
				const line = sourceObj[i];

				const destinationRangeStart = line[0];
				const sourceRangeStart = line[1];
				const length = line[2];

				if (
					destinationRangeStart <= seedDetails[sourceKey] &&
					destinationRangeStart + length > seedDetails[sourceKey]
				) {
					seedDetails[destinationKey] =
						sourceRangeStart + seedDetails[sourceKey] - destinationRangeStart;
				}
				if (seedDetails[destinationKey] === 0) {
					seedDetails[destinationKey] = seedDetails[sourceKey];
				}
			}
		});

	const matchingRange = ranges.find((range) => {
		return range.start <= seedDetails.seed && range.end > seedDetails.seed;
	});

	if (matchingRange) {
		console.log(`🎄 🎅 The answer to part 2 is: ${seedDetails.location} 🍬 🍭`);
		break;
	}
}
