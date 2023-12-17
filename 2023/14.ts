// 14.ts

import { SumArray } from "../utils";
import { part1Data } from "./14.input";

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

export function tiltLeverWest(matrix: Matrix): Matrix {
  let copy: Matrix = JSON.parse(JSON.stringify(matrix));

  for (let line = 0; line <= copy.length - 1; line++) {
    for (let column = 1; column <= copy[0].length - 1; column++) {
      const currentItem = copy[line][column];

      if (currentItem === "O") {
        let newBestLeftness = column;
        for (
          let currentlyInspectedLeftness = column - 1;
          currentlyInspectedLeftness >= 0;
          currentlyInspectedLeftness--
        ) {
          const inspected = copy[line][currentlyInspectedLeftness];
          if (inspected === ".") {
            newBestLeftness = currentlyInspectedLeftness;
          } else if (inspected === "O" || inspected === "#") {
            // cant go any further
            break;
          }
        }

        if (newBestLeftness !== column) {
          copy[line][newBestLeftness] = "O"; // O has gone up to maximum level
          copy[line][column] = "."; // A . replaced it
        }
      }
    }
  }
  return copy;
}

export function tiltLeverSouth(matrix: Matrix): Matrix {
  let copy: Matrix = JSON.parse(JSON.stringify(matrix));
  copy.reverse();
  const reverseTitledNorth = tiltLeverNorth(copy);
  return reverseTitledNorth.reverse();
}

export function tiltLeverEast(matrix: Matrix): Matrix {
  let copy: Matrix = JSON.parse(JSON.stringify(matrix));

  copy = copy.map((l) => l.reverse());
  let reverseTiltedWest = tiltLeverWest(copy);
  reverseTiltedWest = reverseTiltedWest.map((l) => l.reverse());
  return reverseTiltedWest;
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

export function cycleThroughNorthWestSouthEast(
  m: Matrix,
  numberOfCycles = 1
): Matrix {
  let copy = cloneMatrix(m);

  for (let i = 1; i <= numberOfCycles; i++) {
    if (i % 1000 === 0) {
      console.log(`${new Date()} - on iteration ${i}`);
    }

    copy = tiltLeverNorth(copy);
    copy = tiltLeverWest(copy);
    copy = tiltLeverSouth(copy);
    copy = tiltLeverEast(copy);
  }

  return copy;
}

const cloneMatrix = (m: Matrix) => JSON.parse(JSON.stringify(m));

function lookForPatterns() {
  const matrix = getMatrix(part1Data);

  const data: Array<any> = [];

  let copy = cloneMatrix(matrix);
  for (let i = 1; i <= 1000; i++) {
    copy = tiltLeverNorth(copy);
    copy = tiltLeverWest(copy);
    copy = tiltLeverSouth(copy);
    copy = tiltLeverEast(copy);

    const stringified = matrixBackToString(copy);
    const hash = cyrb53(stringified);
    const score = calculateScore(copy);

    const count = data.filter((d) => d.matrix === stringified).length;

    data.push({ iteration: i, count, hash, score });
  }

  console.table(data); // <=== THIS IS WHERE THE MAGIC HAPPENS 🪄
}

const cyrb53 = (str: string) => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

lookForPatterns();
