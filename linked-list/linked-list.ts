export class LinkedList<TElement> extends Array<TElement> {
  // I don't like this one bit... too many side-effects
  public delete(element: TElement): void {
    const idx = this.indexOf(element);
    if (idx >= 0) {
      this.splice(idx, 1);
    }
  }

  public count(): number {
    return this.length;
  }
}
