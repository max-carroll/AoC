import test from "node:test";
import assert from "node:assert";
import { Box, createBoxs, getHash, getScore } from "./15";
import { part1Input } from "./15.raw";

test("char codes - H", () => {
  assert.equal(getHash("H"), 200);
});

test("char codes - HA", () => {
  assert.equal(getHash("HA"), 153);
});

test("char codes - HAS", () => {
  assert.equal(getHash("HAS"), 172);
});

test("char codes - HASH", () => {
  assert.equal(getHash("HASH"), 52);
});

test("getScore example", () => {
  const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
  assert.equal(getScore(input), 1320);
});

test("getScore example rn=1", () => {
  const input = "rn=1";
  assert.equal(getHash(input), 30);
});

test("getScore example 2 combined", () => {
  const input = "rn=1,cm-";
  assert.equal(getScore(input), 30 + 253);
});

test("p1 answer", () => {
  const result = getScore(part1Input);
  assert.equal(result, 510273);
});

test("get Box step 1", () => {
  const input = "rn=1";

  const expected = {
    0: {
      lenses: [{ label: "rn", focal: 1 }],
    },
  };

  assert.deepEqual(createBoxs(input), expected);
});
