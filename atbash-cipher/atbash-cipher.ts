const aCharCode = 97;
const zCharCode = 122;

const flipChar = (char: string): string => {
  if (!char.length) {
    return "";
  }

  if (char.match(/[0-9]/g)?.length) {
    return char;
  }
  const charCode = char.charCodeAt(0);
  return String.fromCharCode(zCharCode - charCode + aCharCode);
};

const partition = <T>(array: T[], size: number): T[][] => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...partition(tail, size)];
};

export const encode = (plainText: string): string => {
  const prePartition = plainText
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "")
    .split("")
    .map(flipChar);
  const partitioned = partition(prePartition, 5);
  return partitioned.map((s) => s.join("")).join(" ");
};

export const decode = (secretText: string): string =>
  secretText
    .replace(/[^a-z0-9]/gi, "")
    .split("")
    .map(flipChar)
    .join("");
