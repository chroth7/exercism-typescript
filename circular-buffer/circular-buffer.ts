export class BufferFullError extends Error {
  constructor() {
    super();
    throw this;
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super();
    throw this;
  }
}

export default class CircularBuffer<T> {
  private readHead = 0;
  private writeHead = 0;
  private bufferLength = 0;
  private data: (T | undefined)[];

  constructor(initial: number) {
    this.bufferLength = initial;
    this.data = Array.from({ length: initial });
  }

  private incWrite(): void {
    this.writeHead = (this.writeHead + 1) % this.bufferLength;
  }

  private incRead(): void {
    this.readHead = (this.readHead + 1) % this.bufferLength;
  }

  write(value: T): void {
    if (
      this.readHead === this.writeHead &&
      this.data[this.readHead] !== undefined
    ) {
      throw new BufferFullError();
    }
    this.data[this.writeHead] = value;
    this.incWrite();
  }

  read(): T {
    const value = this.data[this.readHead];
    if (value === undefined) {
      throw new BufferEmptyError();
    }
    this.data[this.readHead] = undefined;
    this.incRead();
    return value;
  }

  forceWrite(value: T): void {
    if (this.readHead !== this.writeHead) {
      this.write(value);
      return;
    }
    this.data[this.writeHead] = value;
    this.incRead();
    this.incWrite();
  }

  clear(): void {
    this.writeHead = 0;
    this.readHead = 0;
    this.data = Array.from({ length: this.bufferLength });
  }
}
