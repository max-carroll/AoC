import assert from "node:assert";
import test from "node:test";
import {
  Hand,
  getHandInfo,
  getRanksAndWInningInfo,
  getRanksHands,
  letterToNumber,
} from "./7";

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

test("should determine a highCard ", () => {
  ["12345", "6789A", "QKJA3"].forEach((handString) => {
    assert.equal(
      getHandInfo(handString),
      Hand.highCard,
      `${handString} should be highCard`
    );
  });
});

test("should determine a highCard ", () => {
  ["12345", "6789A", "QKJA3"].forEach((handString) => {
    assert.equal(
      getHandInfo(handString),
      Hand.highCard,
      `${handString} should be highCard`
    );
  });
});

test("should determine rank order", () => {
  const hands = [
    { hand: "13333", bid: 6 },
    { hand: "53333", bid: 1 },
    { hand: "23333", bid: 2 },
    { hand: "43333", bid: 3 },
  ];

  const result = getRanksHands(hands);

  assert.deepEqual(result, [
    { hand: "13333", bid: 6 },
    { hand: "23333", bid: 2 },
    { hand: "43333", bid: 3 },
    { hand: "53333", bid: 1 },
  ]);
});

test("should determine rank order example from page", () => {
  const hands = [
    { hand: "32T3K", bid: 765 },
    { hand: "T55J5", bid: 684 },
    { hand: "KK677", bid: 28 },
    { hand: "KTJJT", bid: 220 },
    { hand: "QQQJA", bid: 483 },
  ];

  const result = getRanksHands(hands);

  assert.deepEqual(result, [
    { hand: "32T3K", bid: 765 },
    { hand: "KTJJT", bid: 220 },
    { hand: "KK677", bid: 28 },
    { hand: "T55J5", bid: 684 },
    { hand: "QQQJA", bid: 483 },
  ]);
});

test("should determine and assign rank order example from page", () => {
  const hands = [
    { hand: "32T3K", bid: 765 },
    { hand: "T55J5", bid: 684 },
    { hand: "KK677", bid: 28 },
    { hand: "KTJJT", bid: 220 },
    { hand: "QQQJA", bid: 483 },
  ];

  const result = getRanksAndWInningInfo(hands);

  assert.deepEqual(result, [
    { hand: "32T3K", bid: 765, rank: 1, winnings: 765 },
    { hand: "KTJJT", bid: 220, rank: 2, winnings: 220 * 2 },
    { hand: "KK677", bid: 28, rank: 3, winnings: 28 * 3 },
    { hand: "T55J5", bid: 684, rank: 4, winnings: 684 * 4 },
    { hand: "QQQJA", bid: 483, rank: 5, winnings: 483 * 5 },
  ]);
});

// RANKING ORDER
test("should determine a letter ", () => {
  const cards = "123456789TJQKA";

  const numbers = cards.split("").map((card) => {
    const number = letterToNumber(card);
    return number;
  });

  assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
});
