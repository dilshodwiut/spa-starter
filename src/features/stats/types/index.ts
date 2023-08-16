import type { Layout, Typography } from "antd";
import type { ApexOptions } from "apexcharts";
import type { TFunction } from "i18next";
import type { DataType } from "../api";

interface StatsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Title: typeof Typography.Title;
  colorBgContainer: string;
  contextHolder: React.ReactElement;
  chartConfig: ApexOptions;
  data: DataType | undefined;
  t: TFunction;
}

export type { StatsState, DataType };
