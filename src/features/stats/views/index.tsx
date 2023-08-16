import { DatePicker, List, Select, Space } from "antd";
import ApexChart from "react-apexcharts";
import CustomCard from "@/components/custom-card";
import MiniCard from "../components/mini-card";
import useStatsState from "./state";

export default function Stats(): React.ReactElement {
  const {
    Header,
    Content,
    Title,
    colorBgContainer,
    contextHolder,
    chartConfig,
    data,
    t,
  } = useStatsState();

  return (
    <>
      {contextHolder}
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
              count={data?.admin?.total_count?.count ?? 0}
              trend={data?.admin?.total_count?.trend ?? 0}
            />
            <MiniCard
              text="Общее количество созданных административных протоколов"
              count={data?.admin?.protocol_count?.count ?? 0}
              trend={data?.admin?.protocol_count?.trend ?? 0}
            />
            <MiniCard
              text="Общее количество отправленных административных протоколов"
              count={data?.admin?.protocol_sent?.count ?? 0}
              trend={data?.admin?.protocol_sent?.trend ?? 0}
            />
          </Space>
        </div>

        <div className="my-6">
          <Title level={5}>Уголовные правонарушения</Title>
          <Space size={25}>
            <MiniCard
              text="Общее количество уголовных правонарушений"
              count={data?.criminal?.total_count?.count ?? 0}
              trend={data?.criminal?.total_count?.trend ?? 0}
            />
            <MiniCard
              text="Общее количество созданных уголовных протоколов"
              count={data?.criminal?.protocol_count?.count ?? 0}
              trend={data?.criminal?.protocol_count?.trend ?? 0}
            />
            <MiniCard
              text="Общее количество отправленных уголовных протоколов"
              count={data?.criminal?.protocol_sent?.count ?? 0}
              trend={data?.criminal?.protocol_sent?.trend ?? 0}
            />
          </Space>
        </div>

        <div className="my-6">
          <Title level={5}>Общие сведения по отмененным актам</Title>
          <CustomCard>
            <div className="flex items-center gap-6">
              <ApexChart
                options={chartConfig}
                series={data?.series ?? []}
                type="donut"
              />
              <List
                itemLayout="horizontal"
                className="flex-1"
                dataSource={data?.chart_data}
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
            text="Общее количество отмененных
            актов"
            count={data?.cancelled_acts?.total_count?.count ?? 0}
            trend={data?.cancelled_acts?.total_count?.trend ?? 0}
          />

          <MiniCard
            text="Общее количество просроченных актов"
            count={data?.cancelled_acts?.protocol_count?.count ?? 0}
            trend={data?.cancelled_acts?.protocol_count?.trend ?? 0}
          />

          <MiniCard
            text="Общее количество актов, отказанные прокуратурой"
            count={data?.cancelled_acts?.protocol_sent?.count ?? 0}
            trend={data?.cancelled_acts?.protocol_sent?.trend ?? 0}
          />
        </Space>
      </Content>
    </>
  );
}
