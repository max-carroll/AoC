import assert from "node:assert";
import test from "node:test";
import { GameData, getNumberOfSteps, realGameData } from "./8";

test("should be 6 steps for the last example", () => {
  const testInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

  const numberOfSteps = getNumberOfSteps(testInput);

  assert.equal(numberOfSteps, 6);
});

test("should be X steps for the part1 answer", () => {
  const numberOfSteps = getNumberOfSteps(realGameData, true);

  assert.equal(numberOfSteps, 18727);
});
