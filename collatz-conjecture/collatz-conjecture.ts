const iterator = (input: number, count: number): number => {
  if (input === 1) {
    return count;
  }
  if (input % 2 === 0) {
    return iterator(input / 2, count + 1);
  }
  return iterator(3 * input + 1, count + 1);
};

export const steps = (input: number): number => {
  if (input <= 0) {
    throw new Error("Only positive numbers are allowed");
  }
  return iterator(input, 0);
};
