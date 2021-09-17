export class Triangle {
  isValid = false;
  constructor(private a: number, private b: number, private c: number) {
    const [aa, bb, cc] = [a, b, c].sort();
    this.isValid = aa + bb > cc;
  }

  get isEquilateral(): boolean {
    return this.isValid && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isValid && !this.isScalene;
  }

  get isScalene(): boolean {
    return (
      this.isValid &&
      this.a !== this.b &&
      this.b !== this.c &&
      this.a !== this.c
    );
  }
}
