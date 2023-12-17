export function getEndNumbers(input: string): Array<Array<number>> {
  const matrix = input
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x)));

  let lineIndex = 0;
  let differenceFound = 0;

  while (true) {
    // get top line of matrix

    let differences: Array<number> = [];

    const currentLine = matrix[lineIndex];
    for (var i = 0; i < matrix[lineIndex].length - 1; i++) {
      const diff = currentLine[i + 1] - currentLine[i];
      differences.push(diff);
    }
    matrix.unshift(differences);
    if (differences.every((d) => d === differences[0])) {
      differenceFound = differences[0];
      break;
    }
  }

  const zeros: number[] = [];
  for (var i = 0; i < matrix[0].length - 1; i++) {
    zeros.push(0);
  }
  matrix.unshift(zeros);

  // add on the line numbers
  for (var lineNumber = 1; lineNumber <= matrix.length; lineNumber++) {
    const previousLastNumber = matrix[lineNumber - 1].at(-1)!;
    const currentLastOneInSequence = matrix[lineNumber].at(-1)!;
    const newNumberInSequence = previousLastNumber + currentLastOneInSequence;

    matrix[lineNumber].push(newNumberInSequence);

    console.log(newNumberInSequence);
  }

  console.log(matrix);

  return matrix;
}

// 21
// 21
// 21
// 21

function printTheMatrixLikeATriangle(matrix: Array<Array<number>>) {}
