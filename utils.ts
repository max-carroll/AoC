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
  let currentMultiples = [];
  for (var number of numbers) {
    // get lowest devisor
    for (let devisor = 2; devisor < number / 2; devisor++) {
      if (number % devisor === 0) {
      }
    }
  }

  return 0;
}

export function isPrime(number: number): boolean {
  for (let devisor = 2; devisor <= number / 2; devisor++) {
    if (number % devisor === 0) {
      return false;
    }
  }
  return true;
}
