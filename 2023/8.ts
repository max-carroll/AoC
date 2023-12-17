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

  currentJunctions = [
    // { key: "GQA", choices: { L: "BGC", R: "BHR" } }, // 22411 steps
    // { key: "AAA", choices: { L: "GFB", R: "FBF" } }, // 18727
    { key: "XCA", choices: { L: "VHR", R: "HCS" } }, // 24253
    { key: "HBA", choices: { L: "QCG", R: "KMM" } }, // 14429
    // { key: "GVA", choices: { L: "CTG", R: "VQH" } }, // 16271
    // { key: "NVA", choices: { L: "VHK", R: "QRH" } }, // 20569
  ];

  // [GQA and AAA combined]  1367071 steps
  // 22411 * 18727 = 419690797
  // 419690797 / 1367071 = 307

  // [QGA AAA XCA] = 107998609
  /**
   * 107998609 / 22411 = 4819
   * 107998609 / 18727 = 5767
   * 107998609 / 24253 = 4453
   */

  /**
   *  XCA-HBA = 1139891 (47,79)
   *
   */

  // console.log(currentJunctions);

  while (allAtZ === false) {
    const i = (numberOfSteps - 1) % instructions.length;
    const leftOrRight = instructions[i] as "L" | "R";

    const nextKeys = currentJunctions.map(
      (junction) => junction.choices[leftOrRight]
    ) as Array<string>;

    const keysWithZ = nextKeys.filter((k) => k.endsWith("Z"));
    if (keysWithZ.length >= 1) {
      // console.log(numberOfSteps, nextKeys, keysWithZ);
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

  // console.log("Total steps: ", numberOfSteps);
  return numberOfSteps;
}

// getGhostNumberOfSteps(realGameData);

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

// function multpl

export function getGhostNumberOfStepsUsingJunctions(
  input: string | GameData,
  useJunctionsAtIndex: Array<number>
): number {
  if (typeof input === "string") {
    input = getGameData(input);
  }

  const { instructions, map } = input as GameData;

  let allAtZ = false;
  let numberOfSteps = 1;

  let currentJunctions = [
    { key: "GQA", choices: { L: "BGC", R: "BHR" } }, // [0] 22411 steps
    { key: "AAA", choices: { L: "GFB", R: "FBF" } }, // [1] 18727
    { key: "XCA", choices: { L: "VHR", R: "HCS" } }, // [2] 24253
    { key: "HBA", choices: { L: "QCG", R: "KMM" } }, // [3] 14429
    { key: "GVA", choices: { L: "CTG", R: "VQH" } }, // [4] 16271
    { key: "NVA", choices: { L: "VHK", R: "QRH" } }, // [5] 20569
  ].filter((obj, i) => useJunctionsAtIndex.includes(i));

  // console.log(currentJunctions);

  while (allAtZ === false) {
    const i = (numberOfSteps - 1) % instructions.length;
    const leftOrRight = instructions[i] as "L" | "R";

    const nextKeys = currentJunctions.map(
      (junction) => junction.choices[leftOrRight]
    ) as Array<string>;

    const keysWithZ = nextKeys.filter((k) => k.endsWith("Z"));
    if (keysWithZ.length === nextKeys.length) {
      break;
    }

    for (let x = 0; x < nextKeys.length; x++) {
      const key = nextKeys[x];
      const junction = map[key];
      currentJunctions[x] = { key, choices: junction };
    }

    numberOfSteps++;
  }

  return numberOfSteps;
}

function maxText() {
  let mappings: Array<{
    inputs: Array<number>;
    steps: number;
    dividedBy307: number;
    iSteps: number;
    jSteps: number;
    dividedByI: number;
    dividedByJ: number;
  }> = [];

  const steps = [22411, 18727, 24253, 14429, 16271, 20569];

  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 5; j++) {
      const existingMapping = mappings.find(
        (x) => x.inputs.includes(i) && x.inputs.includes(j)
      );

      if (existingMapping) continue;

      const results = getGhostNumberOfStepsUsingJunctions(realGameData, [i, j]);

      console.log(`found mapping of ${i} and ${j} = ${results}`);
      mappings.push({
        inputs: [i, j],
        steps: results,
        dividedBy307: results / 307,
        dividedByI: results / steps[i],
        dividedByJ: results / steps[j],
        iSteps: steps[i],
        jSteps: steps[j],
      });
    }
  }

  console.table(
    mappings.map((x) => ({ ...x, inputs: JSON.stringify(x.inputs) }))
  );

  const distinctPrimes = new Set();

  mappings.forEach((m) => {
    if (!distinctPrimes.has(m.dividedByI)) {
      distinctPrimes.add(m.dividedByI);
    }

    if (!distinctPrimes.has(m.dividedByJ)) {
      distinctPrimes.add(m.dividedByJ);
    }
  });

  console.log("distinct Primes", Array.from(distinctPrimes));
}

maxText();

function factors() {
  const numbers = [22411, 18727, 24253, 14429, 16271, 20569];

  for (var i = 1; i < 20569; i++) {
    if (numbers.every((n) => n % i === 0)) {
      console.log(i);
    }
  }
}

// Gave part 2 a go
// 61 * 73 * 79 * 47 * 53 * 67 = 58712194939

// > 61 * 73 * 79 * 47 * 53 * 67 * 307
// 18024643846273 <=== HMMMM
// factors();
