export const parse = (phrase: string): string => {
  const regex = /([\w]{1})[A-Z]*[a-z]*/g;
  const matches = [...phrase.matchAll(regex)].map(([, letter]) =>
    letter.toUpperCase()
  );
  return matches.join("");
};
