type Row = number[];
type TriangleType = Row[];

export class Triangle {
  public rows: TriangleType;
  public lastRow: Row;

  constructor(_rows: number) {
    this.rows = Array.from({ length: _rows }, (_, i) => i).reduce(
      (a, v) => (v === 0 ? [[1]] : a.concat([Triangle.nextRow(a)])),
      [] as TriangleType
    );
    this.lastRow = [...this.rows][this.rows.length - 1];
  }

  private static nextRow(prev: TriangleType): Row {
    const lastRow = prev[prev.length - 1];
    return lastRow.map((v, i) => v + (i > 0 ? lastRow[i - 1] : 0)).concat(1);
  }
}
