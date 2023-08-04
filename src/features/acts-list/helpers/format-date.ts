import dayjs from "dayjs";

export default function formatDate(
  date: string,
  format = "DD.MM.YYYY",
): string {
  return dayjs(date).format(format);
}
