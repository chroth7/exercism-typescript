// DISCLAIMER: maybe this is cheating, but I solve the task using string manipulation on the bytes...

const revStr = (s: string): string => s.split("").reverse().join("");

const partition = (s: string, groupSize: number): string[] => {
  const len = s.length;
  const rev = revStr(s);
  const groups = Math.ceil(len / groupSize);
  const arr = Array.from({ length: groups });
  return arr
    .reduce(
      (a: string[], _, i) =>
        a.concat(revStr(rev.substr(i * groupSize, groupSize))),
      [] as string[]
    )
    .reverse();
};

export const encodeSingle = (singleNumber: number): number[] => {
  const number = Number(singleNumber).toString(2);
  const [p7first, ...p7tail] = partition(number, 7);
  const padded = [p7first.padStart(7, "0"), ...p7tail];
  return padded
    .map((p, i) => (i === padded.length - 1 ? "0" : "1") + p)
    .map((s) => parseInt(s, 2));
};

export const encode = (numbers: number[]): number[] =>
  numbers.flatMap(encodeSingle);

export const decodeSingle = (bytes: number[]): number => {
  // check first if sequence is valid
  const last = Number(bytes[bytes.length - 1]).toString(2);
  if (last.length === 8 && last.slice(0, 1) === "1") {
    throw new Error("Incomplete sequence");
  }

  const binary = bytes
    .map((b) => Number(b).toString(2))
    .map((v) => (v.length === 8 ? v.slice(1) : v.padStart(7, "0")))
    .join("");
  return parseInt(binary, 2);
};

export const decode = (bytes: number[]): number[] => {
  let cheat = 0;
  const seqs = bytes.reduce((a, v, i) => {
    if (v <= 127 || i === bytes.length - 1) {
      const updated = a.concat([bytes.slice(cheat, i + 1)]);
      cheat = i + 1;
      return updated;
    }
    return a;
  }, [] as number[][]);
  return seqs.map(decodeSingle);
};
