const fields = ["", "X", "O"] as const;
type Field = typeof fields[number];

interface FieldState {
  row: number;
  column: number;
  state: Field;
}

type BoardEncoding = FieldState[];
type Neighbors = FieldState[];
type Clusters = FieldState[][];

export class Board {
  private width = 0;
  private height = 0;
  private boardEncoding: FieldState[] = [];
  private clusters: Clusters = [];

  constructor(board: string[]) {
    // setup
    this.boardEncoding = board.flatMap((r, i) => this.encodeRow(r, i));
    this.height = board.length;
    this.width = board[0].split(" ").length;
    // work
    this.clusters = this.buildClusters();
  }

  public winner(): Field {
    for (const cluster of this.clusters) {
      if (cluster.length === 0) {
        continue;
      }
      const player = cluster[0].state;
      if (player === "O") {
        if (
          cluster.some(({ row }) => row === 0) &&
          cluster.some(({ row }) => row === this.height - 1)
        ) {
          return "O";
        }
      }
      if (player === "X") {
        if (
          cluster.some(({ column }) => column === 0) &&
          cluster.some(({ column }) => column === this.width - 1)
        ) {
          return "X";
        }
      }
    }

    return "";
  }

  private stringToState(c: string): Field {
    if (c === "X") {
      return "X";
    }
    if (c === "O") {
      return "O";
    }
    return "";
  }

  private encodeRow(row: string, idx: number): BoardEncoding {
    return row
      .trim()
      .split(" ")
      .map((c, i) => ({ row: idx, column: i, state: this.stringToState(c) }));
  }

  private buildClusters(): Clusters {
    const enc = this.boardEncoding.filter(({ state }) => state !== "");
    return enc.reduce((a, v) => this.updateClusters(v, a), [] as Clusters);
  }

  private isInCluster(
    { row: r, column: c, state: s }: FieldState,
    cluster: FieldState[]
  ): boolean {
    return cluster.some(
      ({ row, column, state }) => row === r && column === c && state === s
    );
  }

  private belongsToCluster(neigh: Neighbors, cluster: FieldState[]): boolean {
    return neigh.some((field) => this.isInCluster(field, cluster));
  }

  private updateClusters(
    field: FieldState,
    existingClusters: Clusters
  ): Clusters {
    const neigh = this.getNeighbors(field);
    const accummulator = {
      thisone: [field] as FieldState[],
      theother: [] as Clusters,
    };
    const updatedClusters = existingClusters.reduce(
      (a, v) =>
        this.belongsToCluster(neigh, v)
          ? { ...a, thisone: [...a.thisone, ...v] }
          : { ...a, theother: [...a.theother, v] },
      accummulator
    );
    return [updatedClusters.thisone, ...updatedClusters.theother];
  }

  private getNeighbors({ row, column, state }: FieldState): Neighbors {
    const neighCoords = [
      [row - 1, column], // up left
      [row - 1, column + 1], // up right
      [row, column - 1], // left
      [row, column + 1], // right
      [row + 1, column - 1], // down left
      [row + 1, column], // down right
    ].filter(([r, c]) => r >= 0 && r < this.height && c >= 0 && c < this.width);

    return neighCoords.map(([r, c]) => ({ row: r, column: c, state }));
  }
}
