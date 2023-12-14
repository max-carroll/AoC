// 14.ts

import { SumArray } from "../utils";

// 10*5 =50
// 2 x9 = 18
//

type Matrix = string[][];

const ROUND_ROCK = "O";
const CUBE_ROCK = console.log(SumArray([50, 18, 4 * 8, 3 * 7, 3 * 4, 3]));

export function getMatrix(raw: String): string[][] {
  const result = raw.split("\n").map((line) => line.split(""));
  return result;
}

export function matrixBackToString(matrix: string[][]): string {
  return matrix.flatMap((line) => line.join("")).join("\n");
}

export function tiltLeverNorth(matrix: Matrix): Matrix {
  let copy: Matrix = JSON.parse(JSON.stringify(matrix));

  for (let column = 0; column <= copy[0].length - 1; column++) {
    for (let line = 1; line <= copy.length - 1; line++) {
      const currentItem = copy[line][column];

      if (currentItem === "O") {
        let newBestHeight = line;
        for (
          let currentlyInspectedHeight = line - 1;
          currentlyInspectedHeight >= 0;
          currentlyInspectedHeight--
        ) {
          const inspected = copy[currentlyInspectedHeight][column];
          if (inspected === ".") {
            newBestHeight = currentlyInspectedHeight;
          } else if (inspected === "O" || inspected === "#") {
            // cant go any further
            break;
          }
        }

        if (newBestHeight !== line) {
          copy[newBestHeight][column] = "O"; // O has gone up to maximum level
          copy[line][column] = "."; // A . replaced it
        }
      }
    }
  }

  return copy;
}

export function calculateScore(matrix: Matrix): number {
  let currentScore = 0;
  for (let line = matrix.length - 1; line >= 0; line--) {
    const scoreForEach = matrix.length - line;

    const numberOfRock = matrix[line].filter((c) => c === "O").length;
    const scoreForThisLine = numberOfRock * scoreForEach;
    currentScore += scoreForThisLine;
  }

  return currentScore;
}
