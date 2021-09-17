export const isPangram = (input: string): boolean => {
  const cleanInput = input
    .toLowerCase()
    .replace(/[^a-z]/gi, "")
    .split("");
  const set = new Set(cleanInput);
  return set.size === 26;
};
