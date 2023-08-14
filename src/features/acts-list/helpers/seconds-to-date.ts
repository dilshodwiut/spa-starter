import { T, always, cond, curry } from "ramda";
import type { DateObj } from "../types";

type DurationType = "days" | "hours" | "minutes";
type ToDuration = (
  durationType: DurationType,
  durationInSec: number,
  sec: number,
) => DateObj;

const dayInSeconds = 86400;
const hourInSeconds = 3600;
const minInSeconds = 60;

const secondsToDate = (seconds: number, initialObj: DateObj = {}): DateObj => {
  const toDuration: ToDuration = (durationType, durationInSec, sec) => {
    const fullDurations = Math.floor(sec / durationInSec);
    const { ...obj } = initialObj;
    obj[durationType] = fullDurations;
    return secondsToDate(sec - fullDurations * durationInSec, obj);
  };

  const toDays = curry(toDuration)("days", dayInSeconds);
  const toHours = curry(toDuration)("hours", hourInSeconds);
  const toMinutes = curry(toDuration)("minutes", minInSeconds);

  const toDate = cond([
    [(a: number) => a >= dayInSeconds, toDays],
    [(a: number) => a >= hourInSeconds, toHours],
    [(a: number) => a >= minInSeconds, toMinutes],
    [(a: number) => a === 0, always({})],
    [T, always(initialObj)],
  ]);

  return toDate(seconds);
};

export default secondsToDate;
