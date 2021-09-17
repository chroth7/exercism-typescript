export class ComplexNumber {
  constructor(private _real: number, private _img: number) {}

  public get real(): number {
    return this._real;
  }

  public get imag(): number {
    return this._img;
  }

  private getParts(
    a: ComplexNumber,
    b: ComplexNumber
  ): [aR: number, aI: number, bR: number, bI: number] {
    return [a.real, a.imag, b.real, b.imag];
  }

  public add(other: ComplexNumber): ComplexNumber {
    const [aR, aI, bR, bI] = this.getParts(this, other);
    return new ComplexNumber(aR + bR, aI + bI);
  }

  public sub(other: ComplexNumber): ComplexNumber {
    const [aR, aI, bR, bI] = this.getParts(this, other);
    return new ComplexNumber(aR - bR, aI - bI);
  }

  public div(other: ComplexNumber): ComplexNumber {
    const [aR, aI, bR, bI] = this.getParts(this, other);
    const denom = bR * bR + bI * bI;
    return new ComplexNumber(
      (aR * bR + aI * bI) / denom,
      (aI * bR - aR * bI) / denom
    );
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const [aR, aI, bR, bI] = this.getParts(this, other);
    return new ComplexNumber(aR * bR - aI * bI, aI * bR + aR * bI);
  }

  public get abs(): number {
    return Math.sqrt(this.real ** 2 + this.imag ** 2);
  }

  public get conj(): unknown {
    return new ComplexNumber(
      this.real,
      this.imag === 0 ? this.imag : -this.imag
    );
  }

  public get exp(): ComplexNumber {
    const multiplier = Math.exp(this.real);
    return new ComplexNumber(Math.cos(this.imag), Math.sin(this.imag)).mul(
      new ComplexNumber(multiplier, 0)
    );
  }
}
