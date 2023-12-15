import {
  calculateScore,
  getMatrix,
  matrixBackToString,
  tiltLeverNorth,
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
