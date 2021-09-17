export class Clock {
  hrs = 0;
  mins = 0;

  constructor(hour: number, minute?: number) {
    this.calcHrsMins(hour, minute || 0);
  }

  private calcHrsMins(hour: number, minute: number): void {
    const minRemRaw = (minute || 0) % 60;
    const minRem = minRemRaw < 0 ? minRemRaw + 60 : minRemRaw;
    const minToHour = Math.floor((minute || 0) / 60);
    const hourRemRaw = (hour + minToHour) % 24;
    const hourRem = hourRemRaw < 0 ? hourRemRaw + 24 : hourRemRaw;

    this.mins = minRem;
    this.hrs = hourRem;
  }

  private twoDigitString(num: number): String {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }

  public toString(): string {
    return `${this.twoDigitString(this.hrs)}:${this.twoDigitString(this.mins)}`;
  }

  public plus(minutes: number): Clock {
    this.calcHrsMins(this.hrs, this.mins + minutes);
    return this;
  }

  public minus(minutes: number): Clock {
    this.calcHrsMins(this.hrs, this.mins - minutes);
    return this;
  }

  public equals(other: Clock): boolean {
    return other.toString() === this.toString();
  }
}
