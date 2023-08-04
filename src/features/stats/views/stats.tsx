import dayjs from "dayjs";

export default function Stats(): React.ReactElement {
  console.log(dayjs().second(86400).format("DD HH:mm:ss"));
  return <div>Statistics</div>;
}
