import type { DateObj } from "./seconds-to-date";

export default function displayDeadline(
  dateObj: DateObj,
  hasPassed = false,
): string {
  const orderedKeys = ["days", "hours", "minutes"] as const;
  let output = "";

  orderedKeys.forEach((key) => {
    if (typeof dateObj[key] !== "undefined") {
      output += `${dateObj[key] ?? ""} ${key} `;
    }
  });

  if (output === "") {
    output += "no time remained";
  } else {
    output += hasPassed ? "passed" : "remained";
  }

  return output;
}
