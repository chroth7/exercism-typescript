export const transform = (
  old: Record<number, string[]>
): Record<string, number> => {
  return Object.entries(old).reduce((a, [k, vals]) => {
    const inner = Object.fromEntries(
      vals.map((v) => [v.toLowerCase(), Number(k)])
    );
    return { ...a, ...inner };
  }, {});
};
