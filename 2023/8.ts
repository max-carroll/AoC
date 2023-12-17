import { realData } from "./8.raw";

export type LRChoices = { L: string; R: string };

export type InstructionMap = Record<string, LRChoices>;

export type GameData = {
  instructions: Array<"L" | "R">;
  map: InstructionMap;
};

export function getGameData(input: string): GameData {
  const split = input.split("\n");

  const instructions = split[0].split("") as Array<"L" | "R">;
  const map: InstructionMap = {};

  for (let i = 2; i < split.length; i++) {
    const matches = split[i].match(/(\w{3}).*?(\w{3}).*?(\w{3})/)!;

    const key = matches[1];
    const L = matches[2];
    const R = matches[3];

    // console.log({ key, L, R });

    map[key] = { L, R };
  }

  return {
    instructions,
    map,
  };
}

export const realGameData = getGameData(realData);
// console.log(gameData);

export function getNumberOfSteps(
  input: string | GameData,
  log = false
): number {
  if (typeof input === "string") {
    input = getGameData(input);
  }

  const { instructions, map } = input as GameData;

  let atZ = false;
  let numberOfSteps = 1;
  let currentJunction = map["AAA"];

  while (atZ === false) {
    const i = (numberOfSteps - 1) % instructions.length;
    const leftOrRight = instructions[i] as "L" | "R";
    const nextKey = currentJunction[leftOrRight];

    if (log) {
      const d = [numberOfSteps, currentJunction, leftOrRight, nextKey];
      console.log(
        `${new Date()}  ${d[0]}  | ${i} | ${JSON.stringify(d[1])}  | ${
          d[2]
        } | ${d[3]} `
      );
    }
    if (nextKey === "ZZZ") {
      break;
    }
    // setup things for next bit round the loop
    currentJunction = map[nextKey];
    numberOfSteps++;
  }

  return numberOfSteps;
}

export function getGhostNumberOfSteps(
  input: string | GameData,
  log = false
): number {
  if (typeof input === "string") {
    input = getGameData(input);
  }

  const { instructions, map } = input as GameData;

  let allAtZ = false;
  let numberOfSteps = 1;

  let currentJunctions = Object.entries(map)
    .filter(([key]) => key.endsWith("A"))
    .map(([key, value]) => ({
      key: key,
      choices: value,
    }));

  // console.log(currentJunctions);

  while (allAtZ === false) {
    const i = (numberOfSteps - 1) % instructions.length;
    const leftOrRight = instructions[i] as "L" | "R";

    const nextKeys = currentJunctions.map(
      (junction) => junction.choices[leftOrRight]
    ) as Array<string>;

    const keysWithZ = nextKeys.filter((k) => k.endsWith("Z"));
    if (keysWithZ.length >= 3) {
      console.log(numberOfSteps, nextKeys, keysWithZ);
    }
    if (keysWithZ.length === nextKeys.length) {
      break;
    }
    // setup things for next bit round the loop

    for (let x = 0; x < nextKeys.length; x++) {
      const key = nextKeys[x];
      const junction = map[key];
      currentJunctions[x] = { key, choices: junction };
    }
    // console.log(
    //   `${new Date()} | ${i} | ${numberOfSteps} | ${JSON.stringify(nextKeys)}`
    // );

    numberOfSteps++;
  }

  console.log("Total steps: ", numberOfSteps);
  return numberOfSteps;
}

getGhostNumberOfSteps(realGameData);

// getNumberOfSteps(realData, true); // 5219419

/**
 * | numberOfSteps | i |
 * |---------------|---|
 * |  1            | 0 |
 * |  2            | 1 |
 * |  3            | 2 |
 * HOW?                |  n -1      n-1 % 3
 * |  4            | 0 |   3           0
 * |  5            | 1 |   4           1
 *
 */
