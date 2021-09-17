const divisible = (n: number, divisor: number): boolean => !(n % divisor);

export const isLeap = (year: number): boolean =>
  divisible(year, 400) || (divisible(year, 4) && !divisible(year, 100));
