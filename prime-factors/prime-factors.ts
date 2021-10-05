// how many side effects can you fit in one function 🤦
export const calculatePrimeFactors = (n: number): number[] => {
  let candidate = 2;
  let runner = n;
  const factors: number[] = [];
  while (candidate <= runner) {
    const divides = runner % candidate === 0;
    if (divides) {
      runner = runner / candidate;
      factors.push(candidate);
    } else {
      candidate++;
    }
  }
  return factors;
};
