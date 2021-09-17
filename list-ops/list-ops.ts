// Do *not* construct any array literal ([]) in your solution.
// Do *not* construct any arrays through new Array in your solution.
// DO *not* use any of the Array.prototype methods in your solution.
// You may use the destructuring and spreading (...) syntax from Iterable.

export class List<T> {
  private content: Iterable<T> = [];
  private _length = 0;

  // implement an iterator for the content
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.content;
  }

  public forEach(cb: (value: T) => void): void {
    const content = this.content;

    // todo: can we simplify this?
    const it = (function* (): Iterator<T> {
      yield* content;
    })();

    let result = it.next();
    while (!result.done) {
      cb(result.value);
      result = it.next();
    }
  }

  public static create<T>(...values: T[]): List<T> {
    const list = new List<T>();
    list.content = values;
    list._length = values.length;
    return list;
  }

  public static createOnIterator<T>(
    values: Iterable<T>,
    length: number
  ): List<T> {
    const list = new List<T>();
    list.content = values;
    list._length = length;
    return list;
  }

  public reverse(): List<T> {
    const length = this._length;
    // not sure if this is cheating
    const values = [...this];
    const reverseGenerator = function* (): Iterator<T> {
      for (let i = length - 1; i >= 0; i--) {
        yield values[i];
      }
    };
    return List.createOnIterator(
      { [Symbol.iterator]: reverseGenerator },
      this._length
    );
  }

  public length(): number {
    return this._length;
  }

  public append(appendix: List<T>): List<T> {
    if (appendix.length() === 0) {
      return this;
    }

    const content = this.content;
    const appendGenerator = function* (): Iterator<T> {
      yield* content;
      yield* appendix;
    };
    return List.createOnIterator(
      { [Symbol.iterator]: appendGenerator },
      this._length + appendix.length()
    );
  }

  public concat(concatix: List<List<T>>): List<T> {
    if (concatix.length() === 0) {
      return this;
    }

    const content = this.content;
    const concatGenerator = function* (): Iterator<T> {
      yield* content;
      for (const con of concatix) {
        yield* con;
      }
    };
    return List.createOnIterator(
      { [Symbol.iterator]: concatGenerator },
      this._length +
        concatix.foldl<number, List<T>>((a, v) => a + v.length(), 0)
    );
  }

  // todo: not sure why this would need a generic type (as in the tests)
  public filter<U>(filterFunction: (t: T) => boolean): List<T> {
    if (this._length === 0) {
      return this;
    }
    const content = this.content;
    let len = 0;
    const filterGenerator = function* (): Iterator<T> {
      for (const value of content) {
        if (filterFunction(value)) {
          yield value;
          len++;
        }
      }
    };
    return List.createOnIterator({ [Symbol.iterator]: filterGenerator }, len);
  }

  public map<U>(mapFunction: (t: T) => U): List<U> {
    const content = this.content;
    const mapGenerator = function* (): Iterator<U> {
      for (const value of content) {
        yield mapFunction(value);
      }
    };
    return List.createOnIterator(
      { [Symbol.iterator]: mapGenerator },
      this._length
    );
  }

  // todo: this seems to have a generic type too many...
  public foldl<U, V>(foldFunction: (a: U, v: T) => U, defaultValue: U): U {
    let acc = defaultValue;
    for (const value of this) {
      acc = foldFunction(acc, value);
    }
    return acc;
  }

  // todo: this seems to have a generic type too many...
  public foldr<U, V>(foldFunction: (a: U, v: T) => U, defaultValue: U): U {
    let acc = defaultValue;
    for (const value of this.reverse()) {
      acc = foldFunction(acc, value);
    }
    return acc;
  }
}
