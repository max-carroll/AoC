import { getMatrix, matrixBackToString } from "./14";
import test from "node:test";
import assert from "node:assert";

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
  // prettier-ignore-start
  const ex1 = `O....#....
O.OO#....#`;
  //prettier-ignore-end
});
