import type { getColorFn } from "../types";

const getColor: getColorFn = (input) => {
  const map = {
    administrative: "blue",
    criminal: "green",
    // new: "green",
    // received: "default",
  } as const;

  if (typeof input === "number") {
    if (input > 3) return "green";
    if (input > 0) return "orange";
    return "red";
  }

  return input in map ? map[input] : "default";
};

export default getColor;
