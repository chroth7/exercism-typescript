export const count = (input: string): Map<string, number> => {
  const matcher =
    input.match(
      /[¿¡]?[\w\u0400-\u04FFàâçéèêëîïôûùüÿñæœ:]+(?:'s)?(?:'re)?[?!&@$%^]*/gi
    ) ?? ([] as string[]);

  const words = matcher.map((s) => s.toLowerCase()).sort();
  const counts = words.reduce((a, v) => {
    if (a.has(v)) {
      a.set(v, a.get(v) + 1);
    } else {
      a.set(v, 1);
    }
    return a;
  }, new Map());
  return counts;
};
