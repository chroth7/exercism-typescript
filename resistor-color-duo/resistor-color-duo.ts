const colors = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

export const decodedValue = (input: string[]): number => {
  if (input.length < 2) {
    return 0;
  }
  const c1 = colors.indexOf(input[0]);
  const c2 = colors.indexOf(input[1]);
  const result = Number(`${c1}${c2}`);
  return isNaN(result) ? 0 : result;
};
