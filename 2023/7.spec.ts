import assert from "node:assert";
import test from "node:test";
import { Hand, getHandInfo } from "./7";

test("should determine a 5 of a kind ", () => {
  const hand = getHandInfo("AAAAA");

  assert.equal(hand, Hand.fiveOfAKind);
});

test("should determine a 4 of a kind ", () => {
  const hand = getHandInfo("AAAA4");

  assert.equal(hand, Hand.fourOfAKind);

  const hand2 = getHandInfo("A4AAA");

  assert.equal(hand2, Hand.fourOfAKind);

  const hand3 = getHandInfo("4AAAA");

  assert.equal(hand3, Hand.fourOfAKind);
});

test("should determine a full house ", () => {
  const hand = getHandInfo("AAA66");

  assert.equal(hand, Hand.fullHouse);
});

test("should determine a full house ", () => {
  const hand = getHandInfo("AAA66");

  assert.equal(hand, Hand.fullHouse);
});

test("should determine a three of a kind  ", () => {
  ["AAA64", "A6A4A"].forEach((handString) => {
    assert.equal(
      getHandInfo(handString),
      Hand.threeOfAKind,
      `${handString} should be threeOfAKind`
    );
  });
});

test("should determine a 2 pair ", () => {
  ["AA664", "AA466"].forEach((handString) => {
    assert.equal(
      getHandInfo(handString),
      Hand.twoPair,
      `${handString} should be twoPair`
    );
  });
});

test("should determine a pair ", () => {
  ["AA624", "A1464", "A123A"].forEach((handString) => {
    assert.equal(
      getHandInfo(handString),
      Hand.onePair,
      `${handString} should be onePair`
    );
  });
});
