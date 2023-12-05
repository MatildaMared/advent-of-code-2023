// @ts-nocheck
import * as fs from "fs";
import * as path from "path";
import { Input } from "./utils";

// 🎄 🎅 Advent of Code 2023 Day 5 🎅 🎄

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const lines = input.split("\n\n");

// // 🍬 🍭 Part 1 🍭 🍬

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

const seeds: SeedDetails[] = [];

data.seeds.forEach((seed) => {
	const seedDetails: SeedDetails = {
		seed,
		soil: 0,
		fertilizer: 0,
		water: 0,
		light: 0,
		temperature: 0,
		humidity: 0,
		location: 0,
	};

	Object.keys(data).forEach((key) => {
		if (key === "seeds") {
			return;
		}

		const sourceKey = key.split("-")[0];
		const destinationKey = key.split("-")[2];

		// @ts-ignore
		const sourceObj = data[key] as number[][];

		for (let i = 0; i < sourceObj.length; i++) {
			const line = sourceObj[i];

			const destinationRangeStart = line[0];
			const sourceRangeStart = line[1];
			const length = line[2];

			if (
				seedDetails[sourceKey] >= sourceRangeStart &&
				seedDetails[sourceKey] < sourceRangeStart + length
			) {
				seedDetails[destinationKey] =
					destinationRangeStart + seedDetails[sourceKey] - sourceRangeStart;
			}
		}
		// @ts-ignore
		if (seedDetails[destinationKey] === 0) {
			seedDetails[destinationKey] = seedDetails[sourceKey];
		}
	});

	seeds.push(seedDetails);
});

const lowestLocation = seeds
	.map((seed) => seed.location)
	.sort((a, b) => a - b)[0];

console.log(`🎄 🎅 The answer to part 1 is: ${lowestLocation} 🍬 🍭`);
