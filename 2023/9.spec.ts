import assert from "node:assert";
import test from "node:test";
import { getEndNumbers } from "./9";
import { realInputData } from "./9.raw";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("should do stuff ", () => {
  const result = getEndNumbers(testInput);
  assert.equal(result, 114);
});

test("should do stuff - part1 ", () => {
  const result = getEndNumbers(realInputData);
  assert.equal(result, 1834108701); // guess 1 = 1834108701
});
