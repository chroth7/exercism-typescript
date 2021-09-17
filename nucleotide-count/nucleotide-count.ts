const initObj: Record<string, number> = { A: 0, C: 0, G: 0, T: 0 };
type Nuc = keyof typeof initObj;

const stringToNuc = (s: string): Nuc => {
  switch (s) {
    case "A":
      return "A";
    case "T":
      return "T";
    case "G":
      return "G";
    case "C":
      return "C";
    default:
      throw new Error("Invalid nucleotide in strand");
  }
};

export const nucleotideCounts = (strand: string): Record<Nuc, number> =>
  strand
    .split("")
    .reduce(
      (a, v) => ({ ...a, [stringToNuc(v)]: a[stringToNuc(v)] + 1 }),
      initObj
    );
