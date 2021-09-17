export const isValid = (isbn: string): boolean => {
  const clean = isbn.replace(/[^0-9X]/g, "");
  // some validation first
  if (clean.length !== 10) {
    return false;
  }
  if (clean.substr(0, 9).replace(/[0-9]/g, "").length !== 0) {
    return false;
  }

  return (
    clean
      .split("")
      .reduce((a, v, i) => a + (10 - i) * (v === "X" ? 10 : Number(v)), 0) %
      11 ===
    0
  );
};
