export const square = (n: number): BigInt => {
  if (n <= 0 || n > 64) {
    throw new Error("n must be 0 < n <= 64");
  }
  return BigInt(2 ** (n - 1));
};

export const total = (): BigInt =>
  Array.from({ length: 64 }, (_, i) => i + 1)
    .map((n) => square(n))
    // @ts-ignore --- I wonder why though
    .reduce((a, v) => a + v, 0n);
