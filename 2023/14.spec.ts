import {
  calculateScore,
  cycleThroughNorthWestSouthEast,
  getMatrix,
  matrixBackToString,
  tiltLeverEast,
  tiltLeverNorth,
  tiltLeverSouth,
  tiltLeverWest,
} from "./14";
import test from "node:test";
import assert from "node:assert";
import { part1Data } from "./14.input";

const sampleInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

test("can turn in to matrix", () => {
  const matrix = getMatrix(sampleInput);

  assert.deepEqual(matrix[0], "O....#....".split(""));
});

test("can turn matrix back to string", () => {
  const matrix = getMatrix(sampleInput);

  const original = matrixBackToString(matrix);

  assert.equal(original, sampleInput);
});

test("shift things up", () => {
  const matrix = getMatrix(sampleInput);
  const shifted = tiltLeverNorth(matrix);
  const stringified = matrixBackToString(shifted);

  const expected = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`;

  assert.equal(stringified, expected);
});

test("calculate score", () => {
  const matrix = getMatrix(sampleInput);
  const shifted = tiltLeverNorth(matrix);
  const score = calculateScore(shifted);
  assert.equal(score, 136);
});

test("calculate score part1", () => {
  const matrix = getMatrix(part1Data);
  const shifted = tiltLeverNorth(matrix);
  const score = calculateScore(shifted);
  assert.equal(score, 108813); // TOO LOW apparently
});

// part 2

test("tilt things WEST", () => {
  const matrix = getMatrix(sampleInput);
  const shiftedNorth = tiltLeverNorth(matrix);
  const shiftedWest = tiltLeverWest(shiftedNorth);
  const stringified = matrixBackToString(shiftedWest);

  const expected = `OOOO.#O...
OO..#....#
OOO..##O..
O..#OO....
........#.
..#....#.#
O....#OO..
O.........
#....###..
#....#....`;

  assert.equal(stringified, expected);
});

test("first tilt south", () => {
  const matrix = getMatrix(sampleInput);
  const shiftedNorth = tiltLeverNorth(matrix);
  const shiftedWest = tiltLeverWest(shiftedNorth);
  const shiftedSouth = tiltLeverSouth(shiftedWest);
  const stringified = matrixBackToString(shiftedSouth);

  const expected = `.....#....
....#.O..#
O..O.##...
O.O#......
O.O....O#.
O.#..O.#.#
O....#....
OO....OO..
#O...###..
#O..O#....`;

  assert.equal(stringified, expected);
});

test("first tilt EAST", () => {
  const matrix = getMatrix(sampleInput);
  const shiftedNorth = tiltLeverNorth(matrix);
  const shiftedWest = tiltLeverWest(shiftedNorth);
  const shiftedSouth = tiltLeverSouth(shiftedWest);
  const shiftedEast = tiltLeverEast(shiftedSouth);
  const stringified = matrixBackToString(shiftedEast);

  const expected = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`;

  assert.equal(stringified, expected);

  const expectedAsMatrix = getMatrix(expected);

  assert.deepEqual(shiftedEast[0], expectedAsMatrix[0]);
  assert.deepEqual(shiftedEast[1], expectedAsMatrix[1]);
  assert.deepEqual(shiftedEast[2], expectedAsMatrix[2]);
  assert.deepEqual(shiftedEast[3], expectedAsMatrix[3]);
  assert.deepEqual(shiftedEast[4], expectedAsMatrix[4]);
  assert.deepEqual(shiftedEast[5], expectedAsMatrix[5]);
  assert.deepEqual(shiftedEast[6], expectedAsMatrix[6]);
  assert.deepEqual(shiftedEast[7], expectedAsMatrix[7]);
  assert.deepEqual(shiftedEast[8], expectedAsMatrix[8]);
  assert.deepEqual(shiftedEast[9], expectedAsMatrix[9]);
});

test("should look like this after one cycle", () => {
  const matrix = getMatrix(sampleInput);
  const cycle1 = cycleThroughNorthWestSouthEast(matrix);

  const expected = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`;

  const actualString = matrixBackToString(cycle1);

  assert.equal(actualString, expected);
});

test("should look like this after two cycle", () => {
  const matrix = getMatrix(sampleInput);
  const cycle2 = cycleThroughNorthWestSouthEast(matrix, 2);

  const expected = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`;

  const actualString = matrixBackToString(cycle2);

  assert.equal(actualString, expected);
});

test("should look like this after three cycle", () => {
  const matrix = getMatrix(sampleInput);
  const cycle3 = cycleThroughNorthWestSouthEast(matrix, 3);

  const expected = `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`;

  const actualString = matrixBackToString(cycle3);

  assert.equal(actualString, expected);
});

// test("PART2 - answer https://adventofcode.com/2023/day/14 ", () => {
//   const matrix = getMatrix(part1Data);
//   const numberOfCycles = 1_000_000_000;
//   const fullyShakenMatrix = cycleThroughNorthWestSouthEast(
//     matrix,
//     numberOfCycles
//   );

//   const score = calculateScore(fullyShakenMatrix);

//   assert.equal(score, 100);
// });
