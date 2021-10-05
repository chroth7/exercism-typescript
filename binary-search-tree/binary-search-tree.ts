export class BinarySearchTree {
  private _data: number;
  private _left: BinarySearchTree | undefined = undefined;
  private _right: BinarySearchTree | undefined = undefined;

  constructor(data: number) {
    this._data = data;
  }

  public get data(): number {
    return this._data;
  }

  public get right(): BinarySearchTree | undefined {
    return this._right;
  }

  public get left(): BinarySearchTree | undefined {
    return this._left;
  }

  public insert(item: number): BinarySearchTree {
    if (item > this._data) {
      if (this._right) {
        this._right.insert(item);
      } else {
        this._right = new BinarySearchTree(item);
      }
    } else {
      if (this._left) {
        this._left.insert(item);
      } else {
        this._left = new BinarySearchTree(item);
      }
    }
    return this;
  }

  public each(callback: (data: number | unknown) => number | unknown): void {
    this._left?.each(callback);
    callback(this._data);
    this._right?.each(callback);
  }
}
