const mapper = (letter: string): string => {
  switch (letter) {
    case "G":
      return "C";
    case "C":
      return "G";
    case "T":
      return "A";
    case "A":
      return "U";
    default:
      throw new Error("Invalid input DNA.");
  }
};

export const toRna = (dna: string): string =>
  dna.split("").map(mapper).join("");
