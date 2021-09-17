interface Day {
  number: string;
  order: string;
  gift: string;
}

const days: Map<number, Day> = new Map([
  [1, { number: "and a", order: "first", gift: "Partridge in a Pear Tree." }],
  [2, { number: "two", order: "second", gift: "Turtle Doves" }],
  [3, { number: "three", order: "third", gift: "French Hens" }],
  [4, { number: "four", order: "fourth", gift: "Calling Birds" }],
  [5, { number: "five", order: "fifth", gift: "Gold Rings" }],
  [6, { number: "six", order: "sixth", gift: "Geese-a-Laying" }],
  [7, { number: "seven", order: "seventh", gift: "Swans-a-Swimming" }],
  [8, { number: "eight", order: "eighth", gift: "Maids-a-Milking" }],
  [9, { number: "nine", order: "ninth", gift: "Ladies Dancing" }],
  [10, { number: "ten", order: "tenth", gift: "Lords-a-Leaping" }],
  [11, { number: "eleven", order: "eleventh", gift: "Pipers Piping" }],
  [12, { number: "twelve", order: "twelfth", gift: "Drummers Drumming" }],
]);

const getDay = (n: number): Day =>
  days.get(n) ?? {
    number: "foo",
    order: "bar",
    gift: "Abrahmas M1",
  };

const reciteOne = (n: number): string => {
  const day = getDay(n);
  const opener = `On the ${day.order} day of Christmas my true love gave to me: `;
  const rest = Array.from({ length: n }).map(
    (_, i) =>
      `${getDay(n - i).number.substr(n === 1 ? 4 : 0)} ${getDay(n - i).gift}`
  );
  return opener + rest.join(", ") + "\n";
};

export const recite = (start: number, end: number): string =>
  Array.from({ length: end - start + 1 })
    .map((_, i) => reciteOne(start + i))
    .join("");
