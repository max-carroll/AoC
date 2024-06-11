export function SumArray(array: Array<number>) {
  let total = 0;

  array.forEach((element) => {
    total += element;
  });

  return total;
}

export function getLowestCommonMultiple(numbers: Array<number>): number {
  const map: Map<number, Array<number>> = new Map();

  // get primeMultiples

  for (var number of numbers) {
    let currentMultiples = [];
    // get lowest devisor

    const factors = getFactors(number);
    currentMultiples

  }

  return 0;
}

export function getFactors(number: number): [number, number] {
  for (let devisor = 2; devisor < number / 2; devisor++) {
    if (number % devisor === 0) {
      const otherFactor = number / devisor;
      return [devisor, otherFactor];
    }
  }
  return [1, number];
}

export function isPrime(number: number): boolean {
  for (let devisor = 2; devisor <= number / 2; devisor++) {
    if (number % devisor === 0) {
      return false;
    }
  }
  return true;
}
