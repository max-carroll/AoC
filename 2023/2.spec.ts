import assert from "assert";
import test from "node:test";
import {
  Game,
  GetMinimumCubesRequiredForGame,
  GetPowerOfCubes,
  IsGamePossibleWIthThese,
  ParseData,
} from "./2";

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

// Part2 Test Input

test("getMinimumCubesRequiredForEachGame 1", () => {
  const rawInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const [game1, game2, game3, game4, game5] = ParseData(rawInput);

  const minForGame1 = GetMinimumCubesRequiredForGame(game1);
  assert.deepStrictEqual(minForGame1, { blue: 6, red: 4, green: 2 });

  const minForGame2 = GetMinimumCubesRequiredForGame(game2);
  assert.deepStrictEqual(minForGame2, { blue: 4, red: 1, green: 3 });

  const minForGame3 = GetMinimumCubesRequiredForGame(game3);
  assert.deepStrictEqual(minForGame3, { red: 20, green: 13, blue: 6 });

  const minForGame4 = GetMinimumCubesRequiredForGame(game4);
  assert.deepStrictEqual(minForGame4, { red: 14, green: 3, blue: 15 });

  const minForGame5 = GetMinimumCubesRequiredForGame(game5);
  assert.deepStrictEqual(minForGame5, { red: 6, green: 3, blue: 2 });
});

test("getPowerOfCubes", () => {
  const rawInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const games = ParseData(rawInput);

  const minCubesRequireds = games.map((g) => GetMinimumCubesRequiredForGame(g));

  const powers = minCubesRequireds.map((m) => GetPowerOfCubes(m));

  assert.deepStrictEqual(powers, [48, 12, 1560, 630, 36]);
});
