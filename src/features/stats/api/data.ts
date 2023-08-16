import { sleep } from "radash";

const data = {
  admin: {
    total_count: { count: 8284, trend: 8 },
    protocol_count: { count: 4321, trend: 3 },
    protocol_sent: { count: 3963, trend: -12 },
  },
  criminal: {
    total_count: { count: 3284, trend: 4 },
    protocol_count: { count: 1311, trend: 2 },
    protocol_sent: { count: 1973, trend: -5 },
  },
  cancelled_acts: {
    total_count: { count: 127, trend: -5 },
    protocol_count: { count: 261, trend: 3 },
    protocol_sent: { count: 921, trend: 2 },
  },
  chart_data: [
    {
      key: "#008ffb",
      count: 271,
      title: "Не заполнены все документы в соответствующем порядке",
    },
    {
      key: "#00e396",
      count: 123,
      title: "Не относятся к административным или уголовным правонарушениям",
    },
    {
      key: "#feb019",
      count: 312,
      title: "Не соответствуют действительности и являются ложным документом",
    },
    {
      key: "#ff4560",
      count: 364,
      title:
        "Не подписаны соответствующими государственными органами или лицами",
    },
    {
      key: "#775dd0",
      count: 291,
      title: "Дополнительная причина",
    },
  ],
  series: [271, 123, 312, 364, 291],
};

export async function getData(): Promise<DataType> {
  void sleep(2000);

  return data;
}

type DataType = typeof data;

export type { DataType };
