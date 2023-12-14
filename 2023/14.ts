// 14.ts

import { SumArray } from "../utils";

// 10*5 =50
// 2 x9 = 18
//

console.log(SumArray([50, 18, 4 * 8, 3 * 7, 3 * 4, 3]));

export function getMatrix(raw: String): string[][] {
  const result = raw.split("\n").map((line) => line.split(""));
  return result;
}

export function matrixBackToString(matrix: string[][]): string {
  return matrix.flatMap((line) => line.join("")).join("\n");
}
