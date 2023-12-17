import assert from "node:assert";
import test from "node:test";
import { getEndNumbers } from "./9";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("should ", () => {
  const result = getEndNumbers(testInput);
  assert.equal(result, "hello");
});
