import assert from "assert";
import test from "node:test";
import { LinesToMatrix, getAdjacentCoords, getSplit, rawInput } from "./3";

test("should return right number of lines when splitting", () => {
  const result = getSplit(rawInput);
  assert.equal(result.length, 140);
});

test("all lines should be the same length", () => {
  const result = getSplit(rawInput);

  for (var line of result) {
    assert.equal(line.length, 140);
  }
});

test("should create  a matrix from lines", () => {
  const result = getSplit(rawInput);

  const matrix = LinesToMatrix(result);

  assert.equal(matrix.length, 140);

  assert.equal(matrix[0][0], ".");
});

/**
 *    4,4   4,5   4,6
 *    5,4  (5,5)  5,6
 *    6,4   6,5   6,6
 */
test("should return coordinates adjacent to number", () => {
  const adjacentCoords = getAdjacentCoords(5, 5);

  console.log(adjacentCoords);
  assertHasCoordinates(adjacentCoords, [4, 4]);
  assertHasCoordinates(adjacentCoords, [4, 5]);
  assertHasCoordinates(adjacentCoords, [4, 6]);

  assertHasCoordinates(adjacentCoords, [5, 4]);
  assertHasCoordinates(adjacentCoords, [5, 6]);

  assertHasCoordinates(adjacentCoords, [6, 4]);
  assertHasCoordinates(adjacentCoords, [6, 5]);
  assertHasCoordinates(adjacentCoords, [6, 6]);

  assert.equal(adjacentCoords.length, 8);
});

function assertHasCoordinates(
  array: Array<[number, number]>,
  [ox, oy]: [number, number]
) {
  assert(array.some(([x, y]) => x === ox && y === oy));
}

// assert.deepStrictEqual(adjacentCoords, [

//   [4, 5],
//   [4, 6],
//   [5, 4],
//   [5, 6],
//   [6, 4],
//   [6, 5],
//   [6, 6],
// ]);
// );

/**
 *    4,4   4,5   4,6   4,7  4,8
 *    5,4  (5,5) (5,6) (5,7) 5,8
 *    6,4   6,5   6,6   6,7  6,8
 */
test("should get adjacent coords, if a number has a larger length than 1", () => {
  const adjacentCoords = getAdjacentCoords(5, 5, 3);

  assertHasCoordinates(adjacentCoords, [4, 4]);
  assertHasCoordinates(adjacentCoords, [4, 5]);
  assertHasCoordinates(adjacentCoords, [4, 6]);
  assertHasCoordinates(adjacentCoords, [4, 7]);
  assertHasCoordinates(adjacentCoords, [4, 8]);

  assertHasCoordinates(adjacentCoords, [5, 4]);
  assertHasCoordinates(adjacentCoords, [5, 8]);

  assertHasCoordinates(adjacentCoords, [6, 4]);
  assertHasCoordinates(adjacentCoords, [6, 5]);
  assertHasCoordinates(adjacentCoords, [6, 6]);
  assertHasCoordinates(adjacentCoords, [6, 7]);
  assertHasCoordinates(adjacentCoords, [6, 8]);

  assert.equal(adjacentCoords.length, 12);
});

// test("thingy", () => {
//   const matches =
//     ".........................3.......................................94...............806....................596.........793...........186......".matchAll(
//       /\d+/g
//     );

//   for (var match of matches) {
//     console.log(matches);
//   }
// });
