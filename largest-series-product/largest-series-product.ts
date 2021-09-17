const validate = (s: string, size: number): void => {
  if (size < 0) {
    throw new Error("Span must be greater than zero");
  }
  if (size > s.length) {
    throw new Error("Span must be smaller than string length");
  }
  if (s.replace(/[0-9]/g, "").length > 0) {
    throw new Error("Digits input must only contain digits");
  }
};
const makePacks = (s: string, size: number): string[] =>
  s
    .split("")
    .reduce((a, _, i) => a.concat(s.slice(i, i + size)), [] as string[])
    .filter((pack) => pack.length === size);

export const largestProduct = (s: string, size: number): number => {
  if (s === "" && size === 0) {
    return 1; // weird exception, don't see why they want that...
  }
  validate(s, size);
  const packs = makePacks(s, size);
  const max = packs
    .map((pack) =>
      pack
        .split("")
        .map(Number)
        .reduce((a, v) => a * v, 1)
    )
    .reduce((a, v) => (v > a ? v : a), 0);
  return max;
};
