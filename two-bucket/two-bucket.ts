type BucketId = "one" | "two";

const allMoves = [
  "fillOne",
  "fillTwo",
  "emptyOne",
  "emptyTwo",
  "toTwo",
  "toOne",
] as const;
type Move = typeof allMoves[number];

interface Config {
  oneFill: number;
  twoFill: number;
}

export class TwoBucket {
  private openConfigs: Config[];
  private _moves = 1;
  private done = false;
  private _goalBucket: BucketId = "one";
  private otherFill = 0;
  private prevConfigs: Set<string> = new Set();

  constructor(
    private buckOne: number,
    private buckTwo: number,
    private goal: number,
    starterBuck: BucketId
  ) {
    if (goal > buckOne && goal > buckTwo) {
      this.done = true; // shortcut
    }
    if (starterBuck === "one") {
      this.openConfigs = [{ oneFill: buckOne, twoFill: 0 }];
    } else {
      this.openConfigs = [{ oneFill: 0, twoFill: buckTwo }];
    }
    this.executeMoves();
  }

  private applyMove(move: Move, config: Config): Config {
    switch (move) {
      case "fillOne":
        return { ...config, oneFill: this.buckOne };
      case "fillTwo":
        return { ...config, twoFill: this.buckTwo };
      case "emptyOne":
        return { ...config, oneFill: 0 };
      case "emptyTwo":
        return { ...config, twoFill: 0 };
      case "toTwo": {
        const { oneFill, twoFill } = config;
        const all = oneFill + twoFill;
        const inTwo = Math.min(this.buckTwo, all);
        return { oneFill: all - inTwo, twoFill: inTwo };
      }
      case "toOne": {
        const { oneFill, twoFill } = config;
        const all = oneFill + twoFill;
        const inOne = Math.min(this.buckOne, all);
        return { oneFill: inOne, twoFill: all - inOne };
      }
    }
  }

  private checkGoal(config: Config): Config {
    // nasty side effects!
    if (config.oneFill === this.goal) {
      this.done = true;
      this._goalBucket = "one";
      this.otherFill = config.twoFill;
    }
    if (config.twoFill === this.goal) {
      this.done = true;
      this._goalBucket = "two";
      this.otherFill = config.oneFill;
    }
    return config;
  }

  private removeBadConfigs(config: Config): boolean {
    if (config.oneFill === 0 && config.twoFill === 0) {
      return false;
    }
    if (config.oneFill === this.buckOne && config.twoFill === 0) {
      return false;
    }
    if (config.twoFill === this.buckTwo && config.oneFill === 0) {
      return false;
    }
    if (this.prevConfigs.has(config.oneFill + "#" + config.twoFill)) {
      return false;
    }
    this.prevConfigs.add(config.oneFill + "#" + config.twoFill);
    return true;
  }

  private executeMovesOnConfig(config: Config): Config[] {
    const updated = allMoves.map((move) =>
      this.checkGoal(this.applyMove(move, config))
    );
    return updated.filter((c) => this.removeBadConfigs(c));
  }

  private executeMoves(): void {
    // check first step too
    this.checkGoal(this.openConfigs[0]);
    // loooooping
    while (this.done === false && this._moves < 50) {
      this._moves++;
      this.openConfigs = [
        ...new Set(
          this.openConfigs.flatMap((c) => this.executeMovesOnConfig(c))
        ),
      ];
    }
  }

  moves(): number {
    if (!this.done) {
      throw new Error("Nothing found in 50 moves");
    }
    if (this.goal > this.buckOne && this.goal > this.buckTwo) {
      throw new Error("Is impossible");
    }
    return this._moves;
  }

  get goalBucket(): BucketId {
    return this._goalBucket;
  }

  get otherBucket(): number {
    return this.otherFill;
  }
}
