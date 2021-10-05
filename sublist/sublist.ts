export class List {
  public numbers: number[];

  constructor(...input: number[]) {
    this.numbers = input;
  }

  compare(otherList: List): string {
    const isSub = otherList.numbers.join(",").includes(this.numbers.join(","));
    const isSuper = this.numbers
      .join(",")
      .includes(otherList.numbers.join(","));

    if (isSub && isSuper) {
      return "equal";
    }
    if (isSub) {
      return "sublist";
    }
    if (isSuper) {
      return "superlist";
    }
    return "unequal";
  }
}
