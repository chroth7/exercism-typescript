const insert = <T>(arr: T[], index: number, newItem: T): T[] => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

const createLine = (
  letter: string,
  index: number,
  letterCount: number
): string => {
  const filler = Array.from(
    { length: 2 * letterCount - 3 + (index === 0 ? 1 : 0) },
    () => " "
  );
  if (index === 0) {
    return insert(filler, letterCount - 1, letter).join("");
  }
  const first = insert(filler, letterCount + index - 2, letter);
  return insert(first, letterCount - index - 1, letter).join("");
};

export const makeDiamond = (character: string): string => {
  const letterCount = character.charCodeAt(0) - 64;
  const letters = Array.from({ length: letterCount }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  if (letterCount === 1) {
    return letters.join("\n") + "\n";
  }
  const top = letters.reduce(
    (a, v, i) => a.concat(createLine(v, i, letterCount)),
    [] as string[]
  );
  const bottom = [...top].reverse().slice(1);
  return [...top, ...bottom].join("\n") + "\n";
};
