export class Robot {
  givenName: number;

  private static totalNumberOfNames = 26 * 26 * 1000;
  private static allNames = Array.from(
    { length: Robot.totalNumberOfNames },
    (_, i) => i
  ).sort(() => 0.5 - Math.random()); // pseudo-random, but good enough
  private static openNames = [...Robot.allNames];

  constructor() {
    this.givenName = this.generateName();
  }

  public get name(): string {
    return Robot.intToName(this.givenName);
  }

  public resetName(): void {
    this.generateName();
  }

  public static releaseNames(): void {
    Robot.openNames = [...Robot.allNames];
    return;
  }

  private generateName(): number {
    let name = Robot.openNames.pop();
    while (name === undefined) {
      name = Robot.openNames.pop();
    }
    this.givenName = name;
    return name;
  }

  private static intToName(int: number): string {
    const frac = int / 1000;
    const letters = Math.floor(frac);
    const numbers = Math.round(1000 * (frac - letters));

    let numbersString = `${numbers}`;
    if (numbers < 10) {
      numbersString = `00${numbers}`;
    }
    if (numbers < 100) {
      numbersString = `0${numbers}`;
    }

    const l1AsInt = letters % 26;
    const l2AsInt = (letters - l1AsInt) / 26;

    const l1 = String.fromCharCode(65 + l1AsInt);
    const l2 = String.fromCharCode(65 + l2AsInt);

    return `${l1}${l2}${numbersString}`;
  }
}
