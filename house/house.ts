const opener: string[] = [
  "house that Jack built.",
  "malt",
  "rat",
  "cat",
  "dog",
  "cow with the crumpled horn",
  "maiden all forlorn",
  "man all tattered and torn",
  "priest all shaven and shorn",
  "rooster that crowed in the morn",
  "farmer sowing his corn",
  "horse and the hound and the horn",
];

const linker: string[] = [
  "lay in",
  "ate",
  "killed",
  "worried",
  "tossed",
  "milked",
  "kissed",
  "married",
  "woke",
  "kept",
  "belonged to",
];

export const verse = (n: number): string[] => {
  const open = `This is the ${opener[n - 1]}`;
  const rest =
    n > 1
      ? Array.from({ length: n - 1 })
          .map((_, i) => `that ${linker[i]} the ${opener[i]}`)
          .reverse()
      : [];
  return [open, ...rest];
};

export const verses = (start: number, end: number): string[] =>
  Array.from({ length: end - start + 1 })
    .flatMap((_, i) => [...verse(i + start), ""])
    .slice(0, -1);
// .join("\n");
