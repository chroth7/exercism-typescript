// brute force ✊ - does not work on large ranges...
interface Input {
  maxFactor: number;
  minFactor?: number;
}

interface Prod {
  value: number;
  factors: [number, number][];
}

interface NullableProd {
  value: number | null;
  factors: [number, number][];
}

interface Output {
  smallest: NullableProd;
  largest: NullableProd;
}

const isNew = (
  pair: [number, number][],
  existing: [number, number][]
): boolean => {
  // we know that the pair is only a singleton array
  const [p0, p1] = pair[0];
  const hits = existing.filter((e) => e[0] === p0 && e[1] === p1);
  return hits.length === 0;
};

const cleanUpCandidates = (candidates: Prod[]): Output => {
  const palinsOnly = candidates.filter(
    (c) => Number(c.value.toString().split("").reverse().join("")) === c.value
  );
  if (palinsOnly.length === 0) {
    return {
      smallest: { value: null, factors: [] },
      largest: { value: null, factors: [] },
    };
  }
  const sorted = palinsOnly.sort((a, b) => a.value - b.value);
  const smallestValue = sorted[0].value;
  const largestValue = sorted[sorted.length - 1].value;
  const smallest = sorted
    .filter((p) => p.value === smallestValue)
    .reduce(
      (a, v) => ({
        value: smallestValue,
        factors: isNew(v.factors, a.factors)
          ? a.factors.concat(v.factors)
          : a.factors,
      }),
      { value: 0, factors: [] }
    );
  const largest = sorted
    .filter((p) => p.value === largestValue)
    .reduce(
      (a, v) => ({
        value: largestValue,
        factors: isNew(v.factors, a.factors)
          ? a.factors.concat(v.factors)
          : a.factors,
      }),
      { value: 0, factors: [] }
    );
  return { smallest, largest };
};

export const generate = ({ maxFactor, minFactor = 0 }: Input): Output => {
  if (maxFactor < minFactor) {
    throw new Error("min must be <= max");
  }
  const numbers = Array.from(
    { length: maxFactor - minFactor + 1 },
    (_, i) => i + minFactor
  );
  const candidates: Prod[] = numbers.flatMap((n) =>
    numbers.map((nn) => ({
      value: n * nn,
      factors: [[n, nn].sort()] as [number, number][],
    }))
  );
  return cleanUpCandidates(candidates);
};
