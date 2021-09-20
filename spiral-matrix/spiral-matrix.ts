type Matrix = (unknown | number)[][];
const directions = ["U", "D", "L", "R"] as const;
type Direction = typeof directions[number];
type Coord = [number, number];

interface Reducer {
  matrix: Matrix;
  coord: Coord;
  direction: Direction;
}

const nextCoord = (reducer: Reducer, n: number): Reducer => {
  const { matrix, coord, direction } = reducer;
  const [r, c] = coord;
  switch (direction) {
    case "U": {
      if (matrix[r - 1][c] === -1) {
        return { matrix, coord: [r - 1, c], direction: "U" };
      }
      return { matrix, coord: [r, c + 1], direction: "R" };
    }
    case "R": {
      if (c < n - 1 && matrix[r][c + 1] === -1) {
        return { matrix, coord: [r, c + 1], direction: "R" };
      }
      return { matrix, coord: [r + 1, c], direction: "D" };
    }
    case "D": {
      if (r < n - 1 && matrix[r + 1][c] === -1) {
        return { matrix, coord: [r + 1, c], direction: "D" };
      }
      return { matrix, coord: [r, c - 1], direction: "L" };
    }
    case "L": {
      if (r > 0 && matrix[r][c - 1] === -1) {
        return { matrix, coord: [r, c - 1], direction: "L" };
      }
      return { matrix, coord: [r - 1, c], direction: "U" };
    }
  }
};

export const ofSize = (n: number): Matrix => {
  const raw = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => -1)
  );
  const numbers: number[] = Array.from({ length: n ** 2 }, (_, i) => i + 1);
  const start: Reducer = {
    matrix: raw,
    coord: [0, 0],
    direction: "R",
  };

  const spiralReducer = numbers.reduce((a, v) => {
    const [r, c] = a.coord;
    a.matrix[r][c] = v;
    if (v < n ** 2) {
      return nextCoord(a, n);
    }
    return a;
  }, start);

  return spiralReducer.matrix;
};
