export const proverb = (...words: string[]): string =>
  words.reduce(
    (a, v, i) =>
      i < words.length - 1
        ? a + `For want of a ${v} the ${words[i + 1]} was lost.\n`
        : a,
    ""
  ) + `And all for the want of a ${words[0]}.`;
