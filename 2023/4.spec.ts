import assert from "node:assert";
import test from "node:test";
import { GetPointsFromCard, GetWinningNumbersFromCard } from "./4";

test("Can find winning numbers on a card", () => {
  const card1String = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";

  const winnningNumbers = GetWinningNumbersFromCard(card1String);

  [48, 83, 17, 86].forEach((number) =>
    assert(winnningNumbers.includes(number))
  );
  assert(winnningNumbers.length === 4);
});

test("Get points from card 1", () => {
  const card1String = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";

  const points = GetPointsFromCard(card1String);
  assert(points === 8);
});

test("Get points from card 5", () => {
  const card1String = "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36";

  const points = GetPointsFromCard(card1String);
  assert(points === 0);
});

test("Can find winning numbers on a card 2", () => {
  const card1String = "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19";

  const winnningNumbers = GetWinningNumbersFromCard(card1String);

  [32, 61].forEach((number) => assert(winnningNumbers.includes(number)));
  assert(winnningNumbers.length === 2);
});
