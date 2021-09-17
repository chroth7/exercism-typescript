export class Rational {
  private numerator: number;
  private denominator: number;

  constructor(num: number, den: number) {
    this.numerator = num;
    this.denominator = den;
  }

  private static getComponentsFromOne(one: Rational): [number, number] {
    const n1 = one.numerator;
    const d1 = one.denominator;
    return [n1, d1];
  }

  private static getComponentsFromTwo(
    one: Rational,
    two: Rational
  ): [number, number, number, number] {
    const n1 = one.numerator;
    const d1 = one.denominator;
    const n2 = two.numerator;
    const d2 = two.denominator;
    return [n1, d1, n2, d2];
  }

  add(other: Rational): Rational {
    const [n1, d1, n2, d2] = Rational.getComponentsFromTwo(this, other);
    this.numerator = n1 * d2 + n2 * d1;
    this.denominator = d1 * d2;
    return this.reduce();
  }

  sub(other: Rational): Rational {
    const [n1, d1, n2, d2] = Rational.getComponentsFromTwo(this, other);
    this.numerator = n1 * d2 - n2 * d1;
    this.denominator = d1 * d2;
    return this.reduce();
  }

  mul(other: Rational): Rational {
    const [n1, d1, n2, d2] = Rational.getComponentsFromTwo(this, other);
    this.numerator = n1 * n2;
    this.denominator = d1 * d2;
    return this.reduce();
  }

  div(other: Rational): Rational {
    const [n1, d1, n2, d2] = Rational.getComponentsFromTwo(this, other);
    this.numerator = n1 * d2;
    this.denominator = d1 * n2;
    return this.reduce();
  }

  abs(): Rational {
    this.numerator = Math.abs(this.numerator);
    this.denominator = Math.abs(this.denominator);
    return this;
  }

  exprational(n: number): Rational {
    const [n1, d1] = Rational.getComponentsFromOne(this);
    if (n > 0) {
      this.numerator = Math.pow(n1, n);
      this.denominator = Math.pow(d1, n);
    } else {
      this.numerator = Math.pow(d1, n);
      this.denominator = Math.pow(n1, n);
    }
    return this.reduce();
  }

  private rd(n: number): number {
    return Math.round(1000 * n) / 1000;
  }

  expreal(r: number): number {
    const [n1, d1] = Rational.getComponentsFromOne(this);
    const calc = this.rd(Math.pow(Math.pow(r, Math.abs(n1)), 1 / Math.abs(d1)));
    if (n1 >= 0) {
      return calc;
    }
    return 1 / calc;
  }

  reduce(): Rational {
    const gcd = Rational.gcd(this.numerator, this.denominator);
    this.numerator = this.numerator / gcd;
    this.denominator = this.denominator / gcd;
    // put the negative sign in the numerator
    if (this.numerator > 0 && this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }
    // don't have both negative
    if (this.numerator < 0 && this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }
    return this;
  }

  private static gcd(m: number, n: number): number {
    // To be safe:
    const safeM = Math.floor(Math.abs(m));
    const safeN = Math.floor(Math.abs(n));
    if (safeN === 0) {
      return safeM;
    }
    return Rational.gcd(safeN, safeM % safeN);
  }
}
