import {
  T,
  always,
  compose,
  cond,
  equals,
  flip,
  has,
  ifElse,
  prop,
  type,
} from "ramda";
import type { getColorFn } from "../types";

const flippedHas = flip(has);
const flippedProp = flip(prop);

const map = {
  administrative: "blue",
  criminal: "green",
  // new: "green",
  // received: "default",
} as const;

const getForNum = cond([
  [(a: number) => a > 3, always("green")],
  [(a: number) => a > 0, always("orange")],
  [T, always("red")],
]);

const isNumber = compose(equals("Number"), type);

const getFromMap = ifElse(flippedHas(map), flippedProp(map), always("default"));

const getColor = ifElse(isNumber, getForNum, getFromMap) as getColorFn;

export default getColor;
