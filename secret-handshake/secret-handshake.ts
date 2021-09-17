export const commands = (decimal: number): string[] => {
  if (decimal > 32 || decimal < 0) {
    return [];
  }

  const bits = decimal.toString(2).split("").reverse();
  const actions = ["wink", "double blink", "close your eyes", "jump"];

  const act: string[] = actions
    .map((a, i) => (bits[i] === "1" ? a : ""))
    .filter((x) => x.length);

  if (bits.length === 5) {
    return act.reverse();
  }
  return act;
};
