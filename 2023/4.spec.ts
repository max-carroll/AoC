import assert from "node:assert";
import test from "node:test";
import {
  GetNumberOfCardCopies,
  GetPointsFromCard,
  GetWinningNumbersFromCard,
} from "./4";

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

// PART 2

test("get the correct number of copies for each card", () => {
  const gameData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  const map = GetNumberOfCardCopies(gameData);

  assert.equal(map.get(1), 1); // 1 instance of card 1
  assert.equal(map.get(2), 2); // 2 instances of card 2
  assert.equal(map.get(3), 4); // 4 instances of card 3 [the original, copy won from 1, 2 copies won from 2]
});
