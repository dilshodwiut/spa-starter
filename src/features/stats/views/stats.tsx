import {
  DatePicker,
  Layout,
  List,
  Select,
  Space,
  Typography,
  theme,
} from "antd";
import { useTranslation } from "react-i18next";
import ApexChart from "react-apexcharts";
import formatAmount from "@/helpers/format-amount";
import CustomCard from "@/components/custom-card";
import type { ApexOptions } from "apexcharts";
import MiniCard from "../components/mini-card";

const { Header, Content } = Layout;
const { Title } = Typography;

const data = [
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
    title: "Не подписаны соответствующими государственными органами или лицами",
  },
  {
    key: "#775dd0",
    count: 291,
    title: "Дополнительная причина",
  },
];

const series = [271, 123, 312, 364, 291];

const options: ApexOptions = {
  labels: [
    "Не заполнены все документы в соответствующем порядке",
    "Не относятся к административным или уголовным правонарушениям",
    "Не соответствуют действительности и являются ложным документом",
    "Не подписаны соответствующими государственными органами или лицами",
    "Дополнительная причина",
  ],
  chart: {
    type: "donut",
  },
  legend: { show: false },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "85%",
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: "28px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            color: undefined,
            offsetY: 16,
          },
          total: {
            show: true,
            showAlways: true,
            label: "Всего по причинам",
            fontSize: "16px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            // fontWeight: 600,
            // color: "#373d3f",
            formatter(w) {
              const total: number = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0,
              );
              return formatAmount(total);
            },
          },
        },
      },
    },
  },
};

export default function Stats(): React.ReactElement {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();

  return (
    <>
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <h1 className="font-semibold text-xl">{t("statistics")}</h1>

        <Space size="large">
          <Select
            size="large"
            options={[{ label: "Город Ташкент", value: "tashkent-city" }]}
            placeholder="Город Ташкент"
            className="w-64"
          />
          <DatePicker.RangePicker size="large" />
        </Space>
      </Header>

      <Content
        className="p-8 pt-0"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        <div className="my-6">
          <Title level={5}>Административные правонарушения</Title>
          <Space size={25}>
            <MiniCard
              text="Общее количество административных правонарушений"
              count={8284}
              trend={8}
            />
            <MiniCard
              text="Общее количество созданных административных протоколов"
              count={4321}
              trend={3}
            />
            <MiniCard
              text="Общее количество отправленных административных протоколов"
              count={3963}
              trend={-12}
            />
          </Space>
        </div>

        <div className="my-6">
          <Title level={5}>Уголовные правонарушения</Title>
          <Space size={25}>
            <MiniCard
              text="Общее количество административных правонарушений"
              count={3284}
              trend={4}
            />
            <MiniCard
              text="Общее количество созданных административных протоколов"
              count={1311}
              trend={2}
            />
            <MiniCard
              text="Общее количество отправленных административных протоколов"
              count={1973}
              trend={-5}
            />
          </Space>
        </div>

        <div className="my-6">
          <Title level={5}>Общие сведения по отмененным актам</Title>
          <CustomCard>
            <div className="flex items-center gap-6">
              <ApexChart options={options} series={series} type="donut" />
              <List
                itemLayout="horizontal"
                className="flex-1"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    className="flex items-center gap-2"
                    style={{
                      borderBlockEnd: "0",
                    }}
                  >
                    <span
                      style={{ background: item.key }}
                      className="w-2 h-2 rounded-full"
                    />
                    <List.Item.Meta title={item.title} />
                    <span className="font-bold">{item.count}</span>
                  </List.Item>
                )}
              />
            </div>
          </CustomCard>
        </div>

        <Space size={25}>
          <MiniCard
            text="Общее количество административных правонарушений"
            count={127}
            trend={-5}
          />

          <MiniCard
            text="Общее количество созданных административных протоколов"
            count={261}
            trend={3}
          />

          <MiniCard
            text="Общее количество отправленных административных протоколов"
            count={921}
            trend={2}
          />
        </Space>
      </Content>
    </>
  );
}
