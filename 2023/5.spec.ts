import assert from "node:assert";
import test from "node:test";
import { testDataRawString } from "./5.rawdata";

function GetSeedToSoilMapping(seed: number, rawMapString: string) {}

type MappingType =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location";

interface GameData {
  seeds: Array<number>;
  mappings: Record<MappingType, Array<Mapping>>;
}

function ParseRawStringIntoMappingObjects(rawString: string): GameData {
  const sections = rawString.split("\n\n");

  const justDigits = sections[0].match(/[\d\s]+/)?.[0].trim() ?? "";
  console.log(justDigits);
  const seeds = justDigits.split(" ").map((x) => parseInt(x, 10));

  const gameData: GameData = {
    seeds: seeds,
    mappings: {
      "seed-to-soil": CreateMap(sections[1]),
      "soil-to-fertilizer": CreateMap(sections[2]),
      "fertilizer-to-water": CreateMap(sections[3]),
      "water-to-light": CreateMap(sections[4]),
      "light-to-temperature": CreateMap(sections[5]),
      "temperature-to-humidity": CreateMap(sections[6]),
      "humidity-to-location": CreateMap(sections[7]),
    },
  };

  return gameData;
}

test("should parse Game Data with correct seeds", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  assert.deepStrictEqual(gameData.seeds, [79, 14, 55, 13]);
});

function CreateMap(rawMapString: string): Array<Mapping> {
  const lines = rawMapString.split("\n");

  const mappings: Array<Mapping> = [];

  lines.forEach((line) => {
    if (line.includes("map")) {
      return; // its just the title
    }

    const exploded = line.split(" ");
    if (exploded.length === 3) {
      const [destination, source, range] = exploded;
      const newMapping = new Mapping(
        parseInt(destination),
        parseInt(source),
        parseInt(range)
      );
      mappings.push(newMapping);
    }
  });

  return mappings;
}

// test("should create a map from string", () => {
//   const mapString = `seed-to-soil map:
// 50 98 2
// 52 50 48`;
// });

class Mapping {
  constructor(
    public destination: number,
    public source: number,
    public range: number
  ) {}
}

function GetDestinationUsingMap(
  mappings: Array<Mapping>,
  requestedSource: number
): number {
  for (var mapping of mappings) {
    const { source, destination, range } = mapping;
    const upperSourceBoundary = source + (range - 1);

    const sourceNumberIsWithinBoundary =
      requestedSource <= upperSourceBoundary && requestedSource >= source;

    if (sourceNumberIsWithinBoundary) {
      // JACKPOT we found the correct mapping

      const differenceBetween = requestedSource - source;
      const requestedDestination = destination + differenceBetween;
      return requestedDestination;
    }
  }
  return requestedSource;
}

function GetDestination(mapString: string, requestedSource: number): number {
  const mappings = CreateMap(mapString);

  const result = GetDestinationUsingMap(mappings, requestedSource);
  return result;
}

test("get the right seed mapping ", () => {
  const rawMapString = `50 98 2
52 50 48`;

  const destination = GetDestination(rawMapString, 98);
  assert.equal(destination, 50);

  const destination2 = GetDestination(rawMapString, 99);
  assert.equal(destination2, 51);
});

test("destination is source if theres no mapping", () => {
  const rawMapString = `50 98 2
52 50 48`;

  const destination = GetDestination(rawMapString, 10);
  assert.equal(destination, 10);
});

test("seed number 79 corresponds to 91", () => {
  const rawMapString = `50 98 2
52 50 48`;

  const destination = GetDestination(rawMapString, 79);
  assert.equal(destination, 81);
});

test("should populate the seed-to-soil mappings", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  const seedToSoil = gameData.mappings["seed-to-soil"];

  assert.deepEqual(seedToSoil, [
    { destination: 50, source: 98, range: 2 },
    { destination: 52, source: 50, range: 48 },
  ]);
});

test("should populate the seed-to-soil mappings", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  const seedToSoil = gameData.mappings["soil-to-fertilizer"];

  assert.deepEqual(seedToSoil, [
    { destination: 0, source: 15, range: 37 },
    { destination: 37, source: 52, range: 2 },
    { destination: 39, source: 0, range: 15 },
  ]);
});

interface MappingJourney {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
}

function GetMappingJourneyForSeed(
  seed: number,
  mappings: Record<MappingType, Array<Mapping>>
): MappingJourney {
  const soil = GetDestinationUsingMap(mappings["seed-to-soil"], seed);
  const fertilizer = GetDestinationUsingMap(
    mappings["soil-to-fertilizer"],
    soil
  );
  const water = GetDestinationUsingMap(
    mappings["fertilizer-to-water"],
    fertilizer
  );
  const light = GetDestinationUsingMap(mappings["water-to-light"], water);
  const temperature = GetDestinationUsingMap(
    mappings["light-to-temperature"],
    light
  );
  const humidity = GetDestinationUsingMap(
    mappings["temperature-to-humidity"],
    temperature
  );

  const location = GetDestinationUsingMap(
    mappings["humidity-to-location"],
    humidity
  );

  const mappingJourney: MappingJourney = {
    seed,
    soil,
    fertilizer,
    water,
    light,
    temperature,
    humidity,
    location,
  };

  return mappingJourney;
}

test("should get correct information from seed example 1", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  const mappingJourney = GetMappingJourneyForSeed(79, gameData.mappings);

  assert.equal(mappingJourney.soil, 81);
  assert.equal(mappingJourney.fertilizer, 81);
  assert.equal(mappingJourney.water, 81);
  assert.equal(mappingJourney.light, 74);
  assert.equal(mappingJourney.temperature, 78);
  assert.equal(mappingJourney.humidity, 78);
  assert.equal(mappingJourney.location, 82);
});
