export function getHash(str: string): number {
  // The current value starts at 0.
  let value = 0;

  for (var char of str) {
    // The first character is H; its ASCII code is 72.
    // The current value increases to 72.
    value += char.charCodeAt(0);
    // The current value is multiplied by 17 to become 1224.
    value *= 17;
    // The current value becomes 200 (the remainder of 1224 divided by 256).
    value = value % 256;
    // The next character is A; its ASCII code is 65.

    // The current value increases to 265.
    // The current value is multiplied by 17 to become 4505.
    // The current value becomes 153 (the remainder of 4505 divided by 256).
    // The next character is S; its ASCII code is 83.
    // The current value increases to 236.
    // The current value is multiplied by 17 to become 4012.
    // The current value becomes 172 (the remainder of 4012 divided by 256).
    // The next character is H; its ASCII code is 72.
    // The current value increases to 244.
    // The current value is multiplied by 17 to become 4148.
    // The current value becomes 52 (the remainder of 4148 divided by 256).
  }

  return value;
}

export function getScore(series: string): number {
  let result = 0;
  const split = series.split(",");

  for (var sequence of split) {
    const hashScore = getHash(sequence);
    result += hashScore;
  }

  return result;
}

// PART 2

export interface Box {
  lenses: Array<{
    label: string;
    focal: number;
  }>;
}

export function createBoxs(input: string): Record<number, Box> {
  const boxes: Record<number, Box> = {};

  const series = input.split(",");
  for (let element of series) {
    let label: string = element.match(/[a-z]+/)![0];
    const boxNumber = getHash(label);
    const currentBox = boxes[boxNumber] ?? { lenses: [] };
    let focal = 0;
    if (element.includes("=")) {
      const split = element.split("=");
      focal = parseInt(split[1]);

      const existingLens = currentBox.lenses.find((l) => l.label === label);
      if (!existingLens) {
        currentBox.lenses.push({ label, focal });
      } else {
        const index = currentBox.lenses.indexOf(existingLens);
        currentBox.lenses[index] = { label, focal };
      }
    } else if (element.includes("-")) {
      currentBox.lenses = currentBox.lenses.filter((l) => l.label !== label);
    }
    boxes[boxNumber] = currentBox;
  }

  return boxes;
}
