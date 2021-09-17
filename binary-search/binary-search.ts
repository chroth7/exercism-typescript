export const find = (haystack: number[], needle: number): number | never => {
  const hayLength = haystack.length;
  if (hayLength === 0) {
    throw new Error("Value not in array");
  }
  const midIndex = Math.floor(hayLength / 2);
  const midItem = haystack[midIndex];
  if (midItem === needle) {
    return midIndex;
  }
  //
  // left
  if (needle < midItem) {
    return find(haystack.slice(0, midIndex), needle);
  }

  // right
  return 1 + midIndex + find(haystack.slice(1 + midIndex), needle);
};
