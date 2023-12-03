import assert from "assert";
import test from "node:test";
import {
  GetPartNumbers,
  IsASymbol,
  LinesToMatrix,
  getAdjacentCoords,
  getSplit,
  rawInput,
} from "./3";

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

/**
 *    -1,-1  -1,0   -1,1
 *    0,-1  (0,0)  [0,1]
 *    1,-1  [1,0]  [1,1]
 */
test("adjacent coords cant be less than 0", () => {
  const adjacentCoords = getAdjacentCoords(0, 0);

  assertHasCoordinates(adjacentCoords, [0, 1]);
  assertHasCoordinates(adjacentCoords, [1, 0]);
  assertHasCoordinates(adjacentCoords, [1, 1]);

  assert.equal(adjacentCoords.length, 3);
});

// const get

// test("thingy", () => {
//   const matches =
//     ".........................3.......................................94...............806....................596.........793...........186......".matchAll(
//       /\d+/g
//     );

//   for (var match of matches) {
//     console.log(matches);
//   }
// });
test("small example", () => {
  const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const split = getSplit(testInput);
  const matrix = LinesToMatrix(split);

  const partNumbers = GetPartNumbers(matrix);

  assert(partNumbers[0] === 467);
  assert(partNumbers[1] === 35);
});

test("should return coordinates adjacent to number - failing example 1", () => {
  const adjacentCoords = getAdjacentCoords(0, 5, 3);

  /**
   *
   *      0,4 (0,5) [0,6] [0,7] 0,8
   *      1,4  1,5   1,6   1,7  1,8
   */
  console.log(adjacentCoords);
  assertHasCoordinates(adjacentCoords, [0, 4]);
  assertHasCoordinates(adjacentCoords, [0, 8]);

  assertHasCoordinates(adjacentCoords, [1, 4]);
  assertHasCoordinates(adjacentCoords, [1, 5]);
  assertHasCoordinates(adjacentCoords, [1, 6]);
  assertHasCoordinates(adjacentCoords, [1, 7]);
  assertHasCoordinates(adjacentCoords, [1, 8]);

  assert.equal(adjacentCoords.length, 7);
});

// test("matrix contains symbol at", () => {
//   const testInput = `467..114..
//   ...*......
//   ..35..633.
//   ......#...
//   617*......
//   .....+.58.
//   ..592.....
//   ......755.
//   ...$.*....
//   .664.598..`;

//   const split = getSplit(testInput);
//   const matrix = LinesToMatrix(split);

//   const shouldContainSymbol = [
//     [0, 4], // .
//     [1, 4], // *
//     [1, 6], // .
//     [1, 7],
//     [0, 8],
//     [1, 8],
//   ];
// });

test("is not a symbol .", () => {
  const result = IsASymbol(".");
  assert(result === false);
});
