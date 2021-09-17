interface Letters {
  one: string;
  five: string;
  ten: string;
}

const romanDigit = (digit: number, { one, five, ten }: Letters): string => {
  switch (digit) {
    case 0:
      return "";
    case 1:
      return one;
    case 2:
      return one + one;
    case 3:
      return one + one + one;
    case 4:
      return one + five;
    case 5:
      return five;
    case 6:
      return five + one;
    case 7:
      return five + one + one;
    case 8:
      return five + one + one + one;
    case 9:
      return one + ten;
    default:
      return "";
  }
};

const letters = (n: number): Letters => {
  switch (n) {
    case 0:
      return { one: "M", five: "NA", ten: "NA" };
    case 1:
      return { one: "C", five: "D", ten: "M" };
    case 2:
      return { one: "X", five: "L", ten: "C" };
    case 3:
      return { one: "I", five: "V", ten: "X" };
    default:
      return { one: "NA", five: "NA", ten: "NA" };
  }
};
export const toRoman = (number: number): string => {
  const padded = number.toString().padStart(4, "0").split("");
  return padded.reduce((a, v, i) => a + romanDigit(Number(v), letters(i)), "");
};
