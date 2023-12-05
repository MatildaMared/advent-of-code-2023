export interface Input {
	seeds: number[];
	"seed-to-soil": number[][];
	"soil-to-fertilizer": number[][];
	"fertilizer-to-water": number[][];
	"water-to-light": number[][];
	"light-to-temperature": number[][];
	"temperature-to-humidity": number[][];
	"humidity-to-location": number[][];
}

export interface SeedDetails {
	seed: number;
	soil: number;
	fertilizer: number;
	water: number;
	light: number;
	temperature: number;
	humidity: number;
	location: number;
}

export interface Range {
	start: number;
	end: number;
}
