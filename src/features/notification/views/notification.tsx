import { Button, Layout, Table, theme } from "antd";
import { useTranslation } from "react-i18next";
import { t as T } from "@/utils/i18n";
import type { ColumnsType } from "antd/es/table";

const { Header, Content } = Layout;

interface NotificationType {
  id: string;
  datetime: string;
  description: React.ReactNode;
}

const columns: ColumnsType<NotificationType> = [
  {
    title: T("datetime"),
    dataIndex: "datetime",
  },
  {
    title: T("description"),
    dataIndex: "description",
  },
  {
    title: T("action"),
    render() {
      return (
        <Button className="bg-[#D8F3DC] text-[#40916C]">{T("see")}</Button>
      );
    },
  },
];

const data: NotificationType[] = [
  {
    id: "1",
    datetime: "18.11.2022 - 05:39:19",
    description: (
      <>
        {T("act-processing-time-expires")}{" "}
        <span className="font-semibold">BH 2240106381566</span>
      </>
    ),
  },
  {
    id: "2",
    datetime: "18.11.2022 - 05:39:19",
    description: (
      <>
        {T("act-processing-time-expires")}{" "}
        <span className="font-semibold">BH 2240106381566</span>
      </>
    ),
  },
  {
    id: "3",
    datetime: "18.11.2022 - 05:39:19",
    description: (
      <>
        {T("act-processing-time-expires")}{" "}
        <span className="font-semibold">BH 2240106381566</span>
      </>
    ),
  },
  {
    id: "4",
    datetime: "18.11.2022 - 05:39:19",
    description: (
      <>
        {T("act-processing-time-expires")}{" "}
        <span className="font-semibold">BH 2240106381566</span>
      </>
    ),
  },
];

export default function Notification(): React.ReactElement {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();

  return (
    <>
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 flex items-center"
      >
        <h1 className="font-semibold text-xl">{t("notification")}</h1>
      </Header>
      <Content
        className="p-8"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Content>
    </>
  );
}
