import { lightFormat, parseISO } from "date-fns";

export default function formatDate(
  date: string,
  format = "dd.MM.yyyy",
): string {
  return lightFormat(parseISO(date), format);
}
