export class Anagram {
  private internalRepresentation: string;

  constructor(private input: string) {
    this.internalRepresentation = Anagram.breakIt(input);
  }

  static breakIt(input: string): string {
    return input.toLowerCase().split("").sort().join("");
  }

  public matches(...potentials: string[]): string[] {
    return potentials
      .filter((w) => w.toLowerCase() !== this.input.toLowerCase())
      .reduce(
        (a, v) =>
          Anagram.breakIt(v) === this.internalRepresentation ? a.concat(v) : a,
        [] as string[]
      );
  }
}
