type Classification = "perfect" | "deficient" | "abundant";

export const classify = (n: number): Classification => {
  if (n <= 0) {
    throw new Error("Classification is only possible for natural numbers.");
  }
  // brute force!
  const factors = Array.from(
    { length: Math.floor(n / 2) + 1 },
    (_, i) => i
  ).filter((fact) => n % fact === 0);
  const sum = factors.reduce((a, v) => a + v, 0);
  if (sum === n) {
    return "perfect";
  }
  if (sum > n) {
    return "abundant";
  }
  return "deficient";
};
