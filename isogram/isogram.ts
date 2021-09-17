export function isIsogram(word: string): boolean {
  const [...letters] = word.toLowerCase().replace(/[^\w]/g, "");
  const set = new Set(letters);
  return set.size === letters.length;
}
