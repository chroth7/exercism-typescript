const single = (s: string): string => {
  const rows = s.split("\n");
  if (rows.length !== 4) {
    return "?";
  }
  if (rows.some((r) => r.length !== 3)) {
    return "?";
  }
  const cleanS = s.replace(/\n/g, "").replace(/[^ _|]/g, "");

  if (cleanS.length !== 12) {
    return "?";
  }
  // no need to encode the string into the symbols, too much overhead
  if (cleanS.startsWith(" _ | ||_|")) {
    return "0";
  }
  if (cleanS.startsWith("     |  |")) {
    return "1";
  }
  if (cleanS.startsWith(" _  _||_ ")) {
    return "2";
  }
  if (cleanS.startsWith(" _  _| _|")) {
    return "3";
  }
  if (cleanS.startsWith("   |_|  |")) {
    return "4";
  }
  if (cleanS.startsWith(" _ |_  _|")) {
    return "5";
  }
  if (cleanS.startsWith(" _ |_ |_|")) {
    return "6";
  }
  if (cleanS.startsWith(" _   |  |")) {
    return "7";
  }
  if (cleanS.startsWith(" _ |_||_|")) {
    return "8";
  }
  if (cleanS.startsWith(" _ |_| _|")) {
    return "9";
  }
  return "?";
};

const rowToDigit = (row: string): string[] => {
  const rows = row.split("\n");
  const number = rows[0].length / 3;
  const digits = Array.from({ length: number }, () => 1).reduce(
    (a, _, i) => a.concat(rows.map((r) => r.substr(i * 3, 3)).join("\n")),
    [] as string[]
  );
  return digits;
};

const rowsToRow = (input: string): string[] => {
  const rows = input.split("\n");
  const dummy = Array.from({ length: rows.length / 4 }, (_, i) => i);
  return dummy.map((i) => rows.slice(i * 4, (i + 1) * 4).join("\n"));
};

export const convert = (input: string): string => {
  const rows = rowsToRow(input);
  const digits = rows.map((row) => rowToDigit(row).map(single).join(""));
  return digits.join(",");
};
