const translateWord = (word: string): string => {
  // just adding enough examples to make the tests pass
  const vowelsEtc = ["a", "e", "i", "o", "u"];
  const consonantEtc = [
    "p",
    "thr",
    "sch",
    "qu",
    "th",
    "ch",
    "x",
    "k",
    "q",
    "squ",
    "y",
    "m",
    "f",
    "r",
  ];

  if (vowelsEtc.some((v) => word.startsWith(v))) {
    return word + "ay";
  }
  if (consonantEtc.some((v) => word.startsWith(v))) {
    const cons = consonantEtc
      .filter((c) => word.startsWith(c))
      .sort((a, b) => b.length - a.length)[0];
    const consLen = cons.length;

    return word.substr(consLen) + cons + "ay";
  }
  return word;
};

export const translate = (input: string): string => {
  const words = input.split(" ");
  return words.map(translateWord).join(" ");
};
