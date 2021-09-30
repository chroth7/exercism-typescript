export const transpose = (input: string[]): string[] => {
  const maxRowLen = Math.max(...input.map((r) => r.length));
  const rows = Array.from({ length: maxRowLen }, () => 1);
  return rows
    .reduce((a, _, i) => {
      const trRow: string = input
        .map((r) => (r.substr(i, 1) === "" ? " " : r.substr(i, 1)))
        .join("");
      return a.concat(trRow);
    }, [] as string[])
    .map((r, i) => (maxRowLen === i + 1 ? r.trimEnd() : r));
};
