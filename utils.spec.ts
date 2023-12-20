import assert from "node:assert";
import test from "node:test";
import { getLowestCommonMultiple, isPrime } from "./utils";

// test("12, 16, 24 should return 12", () => {
//   const result = getLowestCommonMultiple([12, 16, 24]);

//   assert.equal(result, 23);
// });

test("is prime", () => {
  [1, 2, 3, 5, 7, 11, 13, 17].forEach((n) => assert.equal(isPrime(n), true));
});

test("is not prime", () => {
  [4, 6, 8, 9, 10].forEach((n) =>
    assert.equal(isPrime(n), false, `expected ${n} to not be prime`)
  );
});
