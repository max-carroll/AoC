import assert from "node:assert";
import test from "node:test";
import { GetWinningNumbersFromCard } from "./4";

test("Can find winning numbers on a card", () => {
  const card1String = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";

  const winnningNumbers = GetWinningNumbersFromCard(card1String);

  [48, 83, 17, 86].forEach((number) =>
    assert(winnningNumbers.includes(number))
  );
  assert(winnningNumbers.length === 4);
});
