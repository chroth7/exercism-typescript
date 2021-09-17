const divides = (n: number, factor: number): boolean => n % factor === 0;

export const convert = (drop: number): string => {
  const fact3 = divides(drop, 3);
  const fact5 = divides(drop, 5);
  const fact7 = divides(drop, 7);

  if (!(fact3 || fact5 || fact7)) {
    return `${drop}`;
  }

  return `${fact3 ? "Pling" : ""}${fact5 ? "Plang" : ""}${
    fact7 ? "Plong" : ""
  }`;
};
