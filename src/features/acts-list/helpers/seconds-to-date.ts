const dayInSeconds = 86400;
const hourInSeconds = 3600;
const minInSeconds = 60;

export interface DateObj {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function secondsToDate(
  seconds: number,
  initialObj: DateObj = {},
): DateObj {
  if (seconds >= dayInSeconds) {
    const fullDays = Math.floor(seconds / dayInSeconds);
    const { ...obj } = initialObj;
    obj.days = fullDays;
    return secondsToDate(seconds - fullDays * dayInSeconds, obj);
  }

  if (seconds >= hourInSeconds) {
    const fullHours = Math.floor(seconds / hourInSeconds);
    const { ...obj } = initialObj;
    obj.hours = fullHours;
    return secondsToDate(seconds - fullHours * hourInSeconds, obj);
  }

  if (seconds >= minInSeconds) {
    const fullMins = Math.floor(seconds / minInSeconds);
    const { ...obj } = initialObj;
    return secondsToDate(seconds - fullMins * minInSeconds, obj);
  }

  if (seconds === 0) {
    return {};
  }

  return initialObj;
}
