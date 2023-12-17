export function getEndNumbers(input: string): number {
  const matrix = input
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x)));

  const results: any = [];
  let indexOfSequenceInMatrix = 0;

  let actualRealAnswer = 0;
  for (var sequence of matrix) {
    const triangle = getCurrentTriangle(sequence, indexOfSequenceInMatrix);
    results.push(triangle);
    actualRealAnswer += triangle.finalNumber;
    indexOfSequenceInMatrix++;
  }

  console.table(results);
  console.log({ actualRealAnswer });

  return actualRealAnswer;
}

function getCurrentTriangle(
  sequence: number[],
  indexOfSequenceInMatrix: number
) {
  const currentTriangle = [sequence];

  // calculate line differences untill theres no difference
  while (true) {
    let differences: Array<number> = [];

    // get the differences
    for (var i = 0; i < currentTriangle[0].length - 1; i++) {
      const diff = currentTriangle[0][i + 1] - currentTriangle[0][i];

      if (isNaN(diff)) throw new Error("NOT A NUMBER");

      differences.push(diff);
    }
    // put them at the top of the triangle
    currentTriangle.unshift(differences);
    if (differences.every((d) => d === differences[0])) {
      break;
    }
  }

  // add the zeros
  const zeros: number[] = [];
  for (var i = 0; i < currentTriangle[0].length - 1; i++) {
    zeros.push(0);
  }
  currentTriangle.unshift(zeros);

  // calculate the end number on each line of the triangle
  for (var lineNumber = 1; lineNumber < currentTriangle.length; lineNumber++) {
    const previousLastNumber = currentTriangle[lineNumber - 1].at(-1)!;
    const currentLastOneInSequence = currentTriangle[lineNumber].at(-1)!;
    const newNumberInSequence = previousLastNumber + currentLastOneInSequence;

    currentTriangle[lineNumber].push(newNumberInSequence);
  }
  const finalNumber: number = currentTriangle.at(-1)?.at(-1)!;
  return {
    indexOfSequenceInMatrix,
    // currentTriangle,
    startingNumbers: JSON.stringify(currentTriangle.at(-1)),
    finalNumber,
  };
}

// 21
// 21
// 21
// 21

function printTheMatrixLikeATriangle(matrix: Array<Array<number>>) {}
