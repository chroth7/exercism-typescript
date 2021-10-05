export class Bowling {
  private runningScore = 0;
  private multiplierNext = 0;
  private multiplierNextNext = 0;
  private frame = 1;
  private runningFrame: number[] = [];

  private validateRoll(pins: number): void {
    if (pins < 0) {
      throw new Error("Negative roll is invalid");
    }
    if (pins > 10) {
      throw new Error("Pin count exceeds pins on the lane");
    }
    if (this.frame > 10 && this.multiplierNext === 0) {
      throw new Error("Cannot roll after game is over");
    }
  }

  static validateFrame(frame: number[]): void {
    if (frame.reduce((a, v) => a + v, 0) > 10) {
      throw new Error("Pin count exceeds pins on the lane");
    }
  }

  private validateScore(): void {
    if (
      this.frame < 10 ||
      (this.frame === 10 && this.runningFrame.length > 0) ||
      (this.frame > 10 && this.multiplierNext > 0)
    ) {
      throw new Error("Score cannot be taken until the end of the game");
    }
  }

  public roll(pins: number): void {
    this.validateRoll(pins);
    this.runningFrame = this.runningFrame.concat(pins);
    Bowling.validateFrame(this.runningFrame);
    const filler = this.frame > 10 ? 1 : 0;
    this.runningScore =
      this.runningScore + (1 + this.multiplierNext - filler) * pins;
    this.multiplierNext = this.multiplierNextNext;
    this.multiplierNextNext = 0;

    const frameTotal = this.runningFrame.reduce((a, v) => a + v, 0);
    // Frame complete
    if (frameTotal === 10 || this.runningFrame.length === 2) {
      // Strike
      if (this.runningFrame.length === 1) {
        if (this.frame < 11) {
          this.multiplierNextNext = this.multiplierNextNext + 1;
        }
      }
      // Strike + Spare
      if (frameTotal === 10) {
        if (this.frame < 11) {
          this.multiplierNext = this.multiplierNext + 1;
        }
      }
      // reset frame
      this.runningFrame = [];
      this.frame = this.frame + 1;
    }
  }

  public score(): number {
    this.validateScore();
    return this.runningScore;
  }
}
