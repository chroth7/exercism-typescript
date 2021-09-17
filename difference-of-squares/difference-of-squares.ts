export class Squares {
  plainNumbers: number[];

  constructor(count: number) {
    this.plainNumbers = Array.from({ length: count }, (_, i) => i + 1);
  }

  private sumArray(array: number[]): number {
    return array.reduce((a, v) => a + v, 0);
  }

  get sumOfSquares(): number {
    return this.sumArray(this.plainNumbers.map((x) => x ** 2));
  }

  get squareOfSum(): number {
    return this.sumArray(this.plainNumbers) ** 2;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares;
  }
}
