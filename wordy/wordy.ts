const patternMatch = (input: string): string[] => input.match(/[\w-]+/gi) || [];

const parseInstruction = ([mmm, op, nnn]: [string, string, string]): number => {
  const m = Number(mmm);
  const n = Number(nnn);
  if (op === "cubed") {
    throw new Error("Unknown operation");
  }
  if (isNaN(m) || isNaN(n)) {
    throw new Error("Syntax error");
  }
  switch (op) {
    case "plus":
      return m + n;
    case "minus":
      return m - n;
    case "multi":
      return m * n;
    case "div":
      return m / n;
    default:
      throw new Error("Unknown operation");
  }
};

const doTheMath = (input: string[]): number => {
  const [m, op, n] = input.slice(0, 3);
  const nextInstruction = input.slice(3);

  const partial = parseInstruction([m, op, n]);
  if (nextInstruction.length === 0) {
    return partial;
  }
  return doTheMath([`${partial}`].concat(nextInstruction));
};

export const answer = (input: string): number => {
  if (!input.startsWith("What is")) {
    throw new Error("Unknown operation");
  }
  const cleanInput = input
    .replace(/What is /gi, "")
    // .replace(/plus/gi, "+")
    // .replace(/minus/gi, "-")
    .replace(/multiplied by/gi, "multi")
    .replace(/divided by/gi, "div")
    .replace(/\?/gi, "");

  const brokenDown = patternMatch(cleanInput);
  if (brokenDown.length === 1) {
    return Number(cleanInput);
  }
  return doTheMath(brokenDown);
};
