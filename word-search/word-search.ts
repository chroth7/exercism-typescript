// not a nice implementation, but it works
// TODO:
// - wrap around filter
// - variable names
// - duplicated code

type Grid = string[];

interface Coordinates {
  start: [number, number];
  end: [number, number];
}

interface Result {
  [s: string]: Coordinates | undefined;
}

export class WordSearch {
  private gridLength: number;

  constructor(private grid: Grid) {
    this.gridLength = grid[0].length;
  }

  private checkRows(wordRaw: string, isFwd: boolean): Coordinates | undefined {
    const word = isFwd ? wordRaw : wordRaw.split("").reverse().join("");
    return this.grid.reduce((a, v, i) => {
      if (a !== undefined) {
        return a;
      }
      if (v.includes(word)) {
        for (let ii = 0; ii < this.gridLength; ii++) {
          if (!v.includes(word, ii)) {
            const start = ii;
            const end = ii + word.length - 1;
            return {
              start: [i + 1, isFwd ? start : end],
              end: [i + 1, isFwd ? end : start],
            } as Coordinates;
          }
        }
        return undefined;
      }
      return undefined;
    }, undefined as Coordinates | undefined);
  }

  private checkCols(wordRaw: string, isFwd: boolean): Coordinates | undefined {
    const word = isFwd ? wordRaw : wordRaw.split("").reverse().join("");
    const cols = Array.from({ length: this.gridLength }, (_, i) =>
      this.grid.map((r) => r[i])
    ).map((s) => s.join(""));
    return cols.reduce((a, v, i) => {
      if (a !== undefined) {
        return a;
      }
      if (v.includes(word)) {
        for (let ii = 0; ii < this.gridLength; ii++) {
          if (!v.includes(word, ii)) {
            const start = ii;
            const end = ii + word.length - 1;
            return {
              start: [isFwd ? start : end, i + 1],
              end: [isFwd ? end : start, i + 1],
            } as Coordinates;
          }
        }
        return undefined;
      }
      return undefined;
    }, undefined as Coordinates | undefined);
  }

  private checkDiagDown(
    wordRaw: string,
    isFwd: boolean
  ): Coordinates | undefined {
    const word = isFwd ? wordRaw : wordRaw.split("").reverse().join("");
    const diags = Array.from({ length: this.gridLength }, (_, i) =>
      this.grid.map((r, ii) => r[(i + ii) % this.gridLength])
    ).map((s) => s.join(""));

    return diags.reduce((a, v, diagIndex) => {
      if (a !== undefined) {
        return a;
      }
      if (v.includes(word)) {
        for (let wordIndex = 0; wordIndex < this.gridLength; wordIndex++) {
          if (!v.includes(word, wordIndex)) {
            const start = wordIndex;
            const end = wordIndex + word.length - 1;

            const startCol = (diagIndex + wordIndex) % this.gridLength;
            const endCol =
              (diagIndex + wordIndex - 1 + word.length) % this.gridLength;

            // TODO: filter out wrap around!

            return {
              start: [isFwd ? start : end, isFwd ? startCol : endCol],
              end: [isFwd ? end : start, isFwd ? endCol : startCol],
            } as Coordinates;
          }
        }
        return undefined;
      }
      return undefined;
    }, undefined as Coordinates | undefined);
  }

  private checkDiagUp(
    wordRaw: string,
    isFwd: boolean
  ): Coordinates | undefined {
    const word = isFwd ? wordRaw : wordRaw.split("").reverse().join("");
    const revGrid = [...this.grid].reverse();
    const diags = Array.from({ length: this.gridLength }, (_, diag) =>
      revGrid.map((r, row) => r[(diag + row) % this.gridLength])
    ).map((s) => s.join(""));

    return diags.reduce((a, v, diagIndex) => {
      if (a !== undefined) {
        return a;
      }
      if (v.includes(word)) {
        for (let wordIndex = 0; wordIndex < this.gridLength; wordIndex++) {
          if (!v.includes(word, wordIndex)) {
            const start = this.gridLength + 1 - wordIndex;
            const end = this.gridLength + 1 - (wordIndex + word.length - 1);

            const startCol = (diagIndex + wordIndex) % this.gridLength;
            const endCol =
              (diagIndex + wordIndex - 1 + word.length) % this.gridLength;

            return {
              start: [isFwd ? start : end, isFwd ? startCol : endCol],
              end: [isFwd ? end : start, isFwd ? endCol : startCol],
            } as Coordinates;
          }
        }
        return undefined;
      }
      return undefined;
    }, undefined as Coordinates | undefined);
  }

  public find(words: string[]): Result {
    const result = words.reduce((a, v) => {
      // left - right
      if (this.checkRows(v, true) !== undefined) {
        a[v] = this.checkRows(v, true);
        // right - left
      } else if (this.checkRows(v, false) !== undefined) {
        a[v] = this.checkRows(v, false);
        // top - bottom
      } else if (this.checkCols(v, true) !== undefined) {
        a[v] = this.checkCols(v, true);
        // bottom - top
      } else if (this.checkCols(v, false) !== undefined) {
        a[v] = this.checkCols(v, false);
        // top left - right bottom
      } else if (this.checkDiagDown(v, true) !== undefined) {
        a[v] = this.checkDiagDown(v, true);
        // right bottom - top left
      } else if (this.checkDiagDown(v, false) !== undefined) {
        a[v] = this.checkDiagDown(v, false);
        // bottom left - right top
      } else if (this.checkDiagUp(v, true) !== undefined) {
        a[v] = this.checkDiagUp(v, true);
        // right top - bottom left
      } else if (this.checkDiagUp(v, false) !== undefined) {
        a[v] = this.checkDiagUp(v, false);
      } else {
        a[v] = undefined;
      }
      return a;
    }, {} as Result);
    return result;
  }
}
