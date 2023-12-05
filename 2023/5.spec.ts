import assert from "node:assert";
import test from "node:test";
import { testDataRawString } from "./5.rawdata";
import {
  GetDestination,
  GetMappingJourneyForSeed,
  Mapping,
  ParseRawStringIntoMappingObjects,
} from "./5";

test("should parse Game Data with correct seeds", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  assert.deepStrictEqual(gameData.seeds, [79, 14, 55, 13]);
});

// test("should create a map from string", () => {
//   const mapString = `seed-to-soil map:
// 50 98 2
// 52 50 48`;
// });

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

test("should get correct information from seed example 2", () => {
  const gameData = ParseRawStringIntoMappingObjects(testDataRawString);

  const mappingJourney = GetMappingJourneyForSeed(14, gameData.mappings);

  assert.equal(mappingJourney.soil, 14);
  assert.equal(mappingJourney.fertilizer, 53);
  assert.equal(mappingJourney.water, 49);
  assert.equal(mappingJourney.light, 42);
  assert.equal(mappingJourney.temperature, 42);
  assert.equal(mappingJourney.humidity, 43);
  assert.equal(mappingJourney.location, 43);
});
