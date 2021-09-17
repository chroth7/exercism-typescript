const checkDigits = (input: string): string => {
  const rev = input.split("").reverse().join("");
  if (rev[6] === "0") {
    throw new Error("Exchange code cannot start with zero");
  }
  if (rev[6] === "1") {
    throw new Error("Exchange code cannot start with one");
  }
  if (rev[9] === "0") {
    throw new Error("Area code cannot start with zero");
  }
  if (rev[9] === "1") {
    throw new Error("Area code cannot start with one");
  }
  return input;
};

export const clean = (input: string): string => {
  const cleanInput = input.replace(/[()\- .+]/g, "");
  if (cleanInput.match(/[a-zA-Z]/g)) {
    throw new Error("Letters not permitted");
  }
  if (cleanInput.match(/[^0-9]/g)) {
    throw new Error("Punctuations not permitted");
  }
  const digits = cleanInput.length;
  if (digits === 10) {
    return checkDigits(cleanInput);
  }
  if (digits === 11) {
    if (cleanInput[0] === "1") {
      return checkDigits(cleanInput).slice(1);
    }
    throw new Error("11 digits must start with 1");
  }
  if (digits > 11) {
    throw new Error("More than 11 digits");
  }
  throw new Error("Incorrect number of digits");
};
