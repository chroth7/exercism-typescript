export class Series {
  private internal: number[];
  private len: number;

  constructor(series: string) {
    this.internal = series.split("").map(Number);
    this.len = series.length;
  }

  slices(sliceLength: number): number[][] {
    if (this.len === 0) {
      throw new Error("series cannot be empty");
    }
    if (sliceLength > this.len) {
      throw new Error("slice length cannot be greater than series length");
    }
    if (sliceLength === 0) {
      throw new Error("slice length cannot be zero");
    }
    if (sliceLength < 0) {
      throw new Error("slice length cannot be negative");
    }
    return this.internal.reduce(
      (a, _, i) =>
        i + sliceLength <= this.len
          ? a.concat([this.internal.slice(i, i + sliceLength)])
          : a,
      [] as number[][]
    );
  }
}
