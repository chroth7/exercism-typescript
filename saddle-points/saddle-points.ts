type Matrix = number[][];

interface Coord {
  row: number;
  column: number;
}

const isSaddle = (
  n: number,
  ri: number,
  ci: number,
  matrix: Matrix
): boolean => {
  const row = matrix[ri];
  if (Math.max(...row) > n) {
    return false;
  }
  const col = matrix.map((r) => r[ci]);
  return Math.min(...col) >= n;
};

export const saddlePoints = (matrix: Matrix): Coord[] =>
  matrix.reduce(
    (ra, rv, ri) =>
      ra.concat(
        rv.reduce(
          (ca, cv, ci) =>
            isSaddle(cv, ri, ci, matrix)
              ? ca.concat({ row: ri + 1, column: ci + 1 })
              : ca,
          [] as Coord[]
        )
      ),
    [] as Coord[]
  );
