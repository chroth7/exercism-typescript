const directions = ["", "|", "-", "+"] as const;
type Direction = typeof directions[number];
type Coordinate = [number, number];
type Layout = Map<string, Direction>;

interface Encoding {
  layout: Layout;
  nodes: Coordinate[];
}

const strToDir = (s: string): Direction => {
  switch (s) {
    case " ":
      return "";
    case "-":
      return "-";
    case "+":
      return "+";
    case "|":
      return "|";
    default:
      throw new Error("Uhoh");
  }
};

const coord = (m: number, n: number): string => `${m}#${n}`;

const encode = (diagram: string[]): Encoding => ({
  layout: new Map(
    diagram.reduce(
      (a, row, ri) =>
        a.concat(
          row.split("").map((c, ci) => [coord(ri, ci), strToDir(c)]) ?? []
        ),
      [] as [string, Direction][]
    )
  ),
  nodes: diagram
    .reduce(
      (a, row, ri) =>
        a.concat(
          row.split("").map((c, ci) => (c === "+" ? [ri, ci] : [-1, -1]))
        ),
      [] as Coordinate[]
    )
    .filter(([a]) => a !== -1),
});

const isHori = (dir: Direction): boolean => dir === "+" || dir === "-";
const isVerti = (dir: Direction): boolean => dir === "+" || dir === "|";

const checkRect = (
  node1: Coordinate,
  node2: Coordinate,
  layout: Layout
): boolean => {
  const [a1, a2] = node1;
  const [b1, b2] = node2;
  // degenerate
  if (a1 === b1 || a2 === b2) {
    return false;
  }
  // mirror image of existing
  if (a2 > b2) {
    return false;
  }
  // opposites need to be nodes too
  if (layout.get(coord(a1, b2)) !== "+") {
    return false;
  }
  if (layout.get(coord(b1, a2)) !== "+") {
    return false;
  }
  // check sides
  const hori: boolean = Array.from({ length: b2 - a2 - 1 }, () => true).reduce(
    (a, _, i) => {
      const upper = layout.get(coord(a1, a2 + i + 1)) || "";
      const lower = layout.get(coord(b1, a2 + i + 1)) || "";
      return a && isHori(upper) && isHori(lower);
    },
    true
  );
  const verti: boolean = Array.from({ length: b1 - a1 - 1 }, () => true).reduce(
    (a, _, i) => {
      const left = layout.get(coord(a1 + i + 1, a2)) || "";
      const right = layout.get(coord(a1 + i + 1, b2)) || "";
      return a && isVerti(left) && isVerti(right);
    },
    true
  );
  // console.log(node1 + "-" + node2);
  return hori && verti;
};

const countRectWithOneFixedNode = (
  node: Coordinate,
  otherNodes: Coordinate[],
  layout: Layout
): number =>
  otherNodes.reduce((a, v) => a + (checkRect(node, v, layout) ? 1 : 0), 0);

export const count = (diagram: string[]): number => {
  const { layout, nodes } = encode(diagram);

  return nodes.reduce(
    (a, v, i) => a + countRectWithOneFixedNode(v, nodes.slice(i + 1), layout),
    0
  );
};
