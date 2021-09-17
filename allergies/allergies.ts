const allergens = [
  "eggs",
  "peanuts",
  "shellfish",
  "strawberries",
  "tomatoes",
  "chocolate",
  "pollen",
  "cats",
] as const;
type Allergen = typeof allergens[number];

export class Allergies {
  private encoded: boolean[];

  constructor(allergenIndex: number) {
    this.encoded = allergenIndex
      .toString(2)
      .split("")
      .reverse()
      .map((s) => s === "1");
  }

  public list(): (Allergen | undefined)[] {
    // the type checker does not seem to get my filter...)
    return this.encoded
      .map((e, i) => (e ? allergens[i] : undefined))
      .filter(Boolean);
  }

  public allergicTo(allergen: Allergen): boolean {
    const idx = allergens.indexOf(allergen);
    return this.encoded[idx];
  }
}
