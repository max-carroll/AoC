import assert from "assert";
import test from "node:test";
import { Game, IsGamePossibleWIthThese } from "./2";

test("should not be possible if too many greens", () => {
  const game: Game = {
    id: 3,
    subsets: [
      { red: 7, green: 9, blue: 7 },
      { red: 4, green: 15, blue: 8 },
      { red: 6, green: 3, blue: 12 },
    ],
  };

  const possible = IsGamePossibleWIthThese(game, 12, 13, 14);
  assert.equal(possible, false);
});
