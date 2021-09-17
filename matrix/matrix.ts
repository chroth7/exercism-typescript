type MatrixType = number[][];

export class Matrix {
  matrix: MatrixType;

  constructor(input: string) {
    // I do not validate the inputs
    const rows = input.split("\n");
    this.matrix = rows.map((r) => r.split(" ").map(Number));
  }

  get rows(): MatrixType {
    return this.matrix;
  }

  get columns(): MatrixType {
    // assuming all is well-behaved here too
    const init: MatrixType = Array.from(
      { length: this.matrix[0].length },
      () => []
    );

    return this.matrix.reduce((a, v) => a.map((r, i) => r.concat(v[i])), init);
  }
}
