const modified = (n: number): number => {
  const temp = 2 * n;
  if (temp > 9) {
    return temp - 9;
  }
  return temp;
};
export function valid(digitString: string): boolean {
  const clean = digitString.replace(/ /gi, "").split("").map(Number);
  if (clean.some((s) => isNaN(s))) {
    return false;
  }
  const checksum = clean.reduce(
    (a, v, i) => (i % 2 !== 0 ? a + modified(v) : a + v),
    0
  );
  return checksum > 0 && checksum % 10 === 0;
}
