export class Gigasecond {
  static GIGASECOND = 10 ** 9;

  constructor(private readonly now: Date) {}

  public date(): Date {
    return new Date(this.now.getTime() + Gigasecond.GIGASECOND * 1000);
  }
}
