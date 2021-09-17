const divides = (v: number, factors: number[]): boolean =>
  factors.some((factor) => v % factor === 0);

export const sum = (factors: number[], max: number): number =>
  Array.from({ length: Math.max(0, max - 1) }, (_, i) => i + 1).reduce(
    (a, v) => (divides(v, factors) ? v + a : a),
    0
  );
