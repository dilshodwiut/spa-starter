import { useEffect } from "react";
import { Layout, Typography, message, theme } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import formatAmount from "@/helpers/format-amount";
import type { ApexOptions } from "apexcharts";
import type { StatsState } from "../types";
import { statsQuery } from "../queries";

const { Header, Content } = Layout;
const { Title } = Typography;

const chartConfig: ApexOptions = {
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

export default function useStatsState(): StatsState {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, error } = useQuery(statsQuery());

  useEffect(() => {
    if (error !== null) {
      void messageApi.error({
        key: "acts-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: error?.statusText ?? t("error-fetching-data"),
      });
    }
  }, [error, messageApi, t]);

  return {
    Header,
    Content,
    Title,
    colorBgContainer,
    contextHolder,
    chartConfig,
    data,
    t,
  };
}
