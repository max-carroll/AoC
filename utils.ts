export function SumArray(array: Array<number>) {
  let total = 0;

  array.forEach((element) => {
    total += element;
  });

  return total;
}
