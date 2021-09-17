const groupLength = 3;

const splitInGroups = (input: string): string[] => {
  const count = input.length;

  const idxs = Array.from({ length: Math.floor(count / groupLength) });

  return idxs.map((_, i) => input.slice(i * 3, (i + 1) * 3));
};

const mapping = (input: string): string => {
  switch (input) {
    case "AUG":
      return "Methionine";
    case "UUU":
    case "UUC":
      return "Phenylalanine";
    case "UUA":
    case "UUG":
      return "Leucine";
    case "UCU":
    case "UCC":
    case "UCA":
    case "UCG":
      return "Serine";
    case "UAU":
    case "UAC":
      return "Tyrosine";
    case "UGU":
    case "UGC":
      return "Cysteine";
    case "UGG":
      return "Tryptophan";
    case "UAA":
    case "UAG":
    case "UGA":
      return "STOP";
    default:
      return "Uhoh";
  }
};

export const translate = (input: string): string[] => {
  const splits = splitInGroups(input);
  const translated = splits.reduce(
    (a, v) => a.concat(mapping(v)),
    [] as string[]
  );
  const stopper = translated.indexOf("STOP");
  if (stopper === -1) {
    return translated;
  }
  return translated.slice(0, stopper);
};
