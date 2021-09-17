const weirdOnes: Map<number, string> = new Map([
  [0, "zero"],
  [1, "one"],
  [2, "two"],
  [3, "three"],
  [4, "four"],
  [5, "five"],
  [6, "six"],
  [7, "seven"],
  [8, "eight"],
  [9, "nine"],
  [10, "ten"],
  [11, "eleven"],
  [12, "twelve"],
  [13, "thirteen"],
  [14, "fourteen"],
  [15, "fifteen"],
  [16, "sixteen"],
  [17, "seventeen"],
  [18, "eightteen"],
  [19, "nineteen"],
]);

const tens: Map<number, string> = new Map([
  [10, "ten"],
  [20, "twenty"],
  [30, "thirty"],
  [40, "forty"],
  [50, "fifty"],
  [60, "sixty"],
  [70, "seventy"],
  [80, "eighty"],
  [90, "ninety"],
]);

const separators: string[] = ["", "thousand", "million", "billion"];

const say3Digit = (n: number, sayZero: boolean): string => {
  if (n === 0 && !sayZero) {
    return "";
  }
  if (weirdOnes.has(n)) {
    return weirdOnes.get(n) ?? "Huh";
  }
  if (tens.has(n)) {
    return tens.get(n) ?? "Huuuuh?";
  }
  let hund = "";
  let ten = "";
  if (n > 99) {
    const nH = Number(n.toString().substr(0, 1));
    hund = weirdOnes.get(nH) + " hundred ";
  }
  const belowHundred = n % 100;
  if (weirdOnes.has(n)) {
    return (hund + weirdOnes.get(belowHundred)).trim();
  }
  const tH =
    belowHundred > 19 ? Number(belowHundred.toString().substr(0, 1)) : 0;
  const oH = Number(belowHundred.toString().split("").reverse()[0]);
  ten =
    (tH === 0 ? "" : tens.get(tH * 10)) +
    (oH !== 0 ? "-" + weirdOnes.get(oH) : "");
  return (hund + ten).trim();
};

const splitInGroups = (input: string): Number[] => {
  const count = input.length;
  const corr = (3 - (count % 3)) % 3;

  const idxs = Array.from({ length: Math.ceil(count / 3) });

  return idxs
    .map((_, i) =>
      input.substr(-(i === 0 ? 0 : corr) + i * 3, 3 - (i === 0 ? corr : 0))
    )
    .map(Number);
};

export const sayInEnglish = (input: number): string => {
  if (input < 0 || input > 999_999_999_999) {
    throw new Error("Number must be between 0 and 999,999,999,999.");
  }
  const groupIn3 = splitInGroups(input.toString()).map(Number);
  // console.log(groupIn3 + "---" + input);
  if (groupIn3.length === 1) {
    return groupIn3.map((g) => say3Digit(g, true)).join(" ");
  }
  const numberWordsPerGroup = groupIn3.map((g) => say3Digit(g, false));

  return numberWordsPerGroup
    .reverse()
    .flatMap((w, i) => [w.length ? separators[i] : "", w])
    .filter((w) => w.length)
    .reverse()
    .join(" ");
};
