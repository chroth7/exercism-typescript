export const verse = (i: number): string => {
  if (i === 0) {
    return `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.
`;
  }
  const bot = i === 1 ? "bottle" : "bottles";
  const bot2 = i === 2 ? "bottle" : "bottles";
  const part3 = i === 1 ? "it" : "one";
  const part4 = i === 1 ? "no more" : (i - 1).toString();
  return `${i} ${bot} of beer on the wall, ${i} ${bot} of beer.
Take ${part3} down and pass it around, ${part4} ${bot2} of beer on the wall.
`;
};

export const sing = (
  initialBottlesCount: number = 99,
  takeDownCount: number = 0
): string =>
  Array.from({ length: initialBottlesCount - takeDownCount + 1 }, (_, i) =>
    verse(initialBottlesCount - i)
  ).join("\n");
