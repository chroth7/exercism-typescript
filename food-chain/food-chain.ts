const animalia = [
  "fly",
  "spider",
  "bird",
  "cat",
  "dog",
  "goat",
  "cow",
  "horse",
] as const;
type Animal = typeof animalia[number];

const exclamations: Map<Animal, string> = new Map([
  ["fly", "I don't know why she swallowed the fly. Perhaps she'll die.\n"],
  ["spider", "It wriggled and jiggled and tickled inside her.\n"],
  ["bird", "How absurd to swallow a bird!\n"],
  ["cat", "Imagine that, to swallow a cat!\n"],
  ["dog", "What a hog, to swallow a dog!\n"],
  ["goat", "Just opened her throat and swallowed a goat!\n"],
  ["cow", "I don't know how she swallowed a cow!\n"],
  ["horse", "She's dead, of course!\n"],
]);

const opener = (a1: Animal): string =>
  `I know an old lady who swallowed a ${a1}.\n`;

const swallower = (a1: Animal, a2: Animal): string =>
  `She swallowed the ${a1} to catch the ${a2}${
    a2 === "spider" ? " that wriggled and jiggled and tickled inside her" : ""
  }.\n`;

export const verse = (n: number): string => {
  const animal = animalia[n - 1];
  const open = opener(animal);
  const swallows =
    n > 1
      ? Array.from({ length: n - 1 }).map((_, i) =>
          swallower(animalia[n - 1 - i], animalia[n - 2 - i])
        )
      : undefined;
  return (
    open +
    (animal === "fly" ? "" : exclamations.get(animal)) +
    (animal !== "horse"
      ? (swallows ? swallows.join("") : "") + (exclamations.get("fly") ?? "")
      : "")
  );
};

export const verses = (n1: number, n2: number): string =>
  Array.from({ length: n2 - n1 + 1 }, (_, i) => i + n1)
    .map(verse)
    .join("\n");
