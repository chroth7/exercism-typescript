// doing a side-effect/loop based solution, as recursion might be tricky due to tco
export const primes = (n: number): number[] => {
  let candidates = Array.from({ length: n }, (_, i) => i + 1).filter(
    (nn) => nn > 1
  );
  const primesFound: number[] = [];
  while (candidates.length > 0) {
    const [nextCandidate, ...otherCandidates] = candidates;
    primesFound.push(nextCandidate);
    candidates = otherCandidates.filter((c) => c % nextCandidate !== 0);
  }
  return primesFound;
};
