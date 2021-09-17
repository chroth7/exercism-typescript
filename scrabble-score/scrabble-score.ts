const mapper = (letter: string): number => {
  const one = ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"];
  const two = ["d", "g"];
  const three = ["b", "c", "m", "p"];
  const four = ["f", "h", "v", "w", "y"];
  const five = ["k"];
  const eight = ["j", "x"];
  const ten = ["q", "z"];
  const scores = [1, 2, 3, 4, 5, 8, 10];
  const letters = [one, two, three, four, five, eight, ten];
  return letters.reduce(
    (a, v, i) => (v.includes(letter) ? a + scores[i] : a),
    0
  );
};

export const score = (input: string | undefined): number => {
  if (input === undefined || input.length === 0) {
    return 0;
  }
  return input
    .split("")
    .map((l) => l.toLowerCase())
    .map((l) => mapper(l))
    .reduce((a, v) => a + v, 0);
};
