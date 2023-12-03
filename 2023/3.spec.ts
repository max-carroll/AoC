import assert from "assert";
import test from "node:test";
import { LinesToMatrix, getSplit, rawInput } from "./3";

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
