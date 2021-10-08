export class CustomSet {
  public data: number[] = [];

  constructor(initial?: number[]) {
    this.data = initial ? initial : [];
    this.dedupe();
  }

  private dedupe(): void {
    // I am using `Set` here just to dedupe quickly, not as a data structure
    this.data = [...new Set(this.data)];
  }

  empty(): boolean {
    return this.data.length === 0;
  }

  contains(element: number): boolean {
    return this.data.includes(element);
  }

  add(element: number): CustomSet {
    this.data = [...this.data, element];
    this.dedupe();
    return this;
  }

  subset(other: CustomSet): boolean {
    return this.data.every((d) => other.contains(d));
  }

  disjoint(other: CustomSet): boolean {
    return !this.data.some((d) => other.contains(d));
  }

  eql(other: CustomSet): boolean {
    return this.data.length === other.data.length && this.subset(other);
  }

  union(other: CustomSet): CustomSet {
    this.data = [...this.data, ...other.data];
    this.dedupe();
    return this;
  }

  intersection(other: CustomSet): CustomSet {
    const intersection = this.data.filter((d) => other.data.includes(d));
    return new CustomSet(intersection);
  }

  difference(other: CustomSet): CustomSet {
    const difference = this.data.filter((d) => !other.data.includes(d));
    return new CustomSet(difference);
  }
}
