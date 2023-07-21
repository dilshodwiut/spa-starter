import { Button, Layout, Table, theme } from "antd";
import { useTranslation } from "react-i18next";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

const { Header, Content } = Layout;

interface NotificationType {
  id: string;
  datetime: string;
  description: React.ReactNode;
}

export default function Notification(): React.ReactElement {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();

  const columns: ColumnsType<NotificationType> = useMemo(
    () => [
      {
        title: t("datetime"),
        dataIndex: "datetime",
      },
      {
        title: t("description"),
        dataIndex: "description",
      },
      {
        title: t("action"),
        render() {
          return (
            <Button className="bg-[#D8F3DC] text-[#40916C]">{t("see")}</Button>
          );
        },
      },
    ],
    [t],
  );

  const data: NotificationType[] = useMemo(
    () => [
      {
        id: "1",
        datetime: "18.11.2022 - 05:39:19",
        description: (
          <>
            {t("act-processing-time-expires")}{" "}
            <span className="font-semibold">BH 2240106381566</span>
          </>
        ),
      },
      {
        id: "2",
        datetime: "18.11.2022 - 05:39:19",
        description: (
          <>
            {t("act-processing-time-expires")}{" "}
            <span className="font-semibold">BH 2240106381566</span>
          </>
        ),
      },
      {
        id: "3",
        datetime: "18.11.2022 - 05:39:19",
        description: (
          <>
            {t("act-processing-time-expires")}{" "}
            <span className="font-semibold">BH 2240106381566</span>
          </>
        ),
      },
      {
        id: "4",
        datetime: "18.11.2022 - 05:39:19",
        description: (
          <>
            {t("act-processing-time-expires")}{" "}
            <span className="font-semibold">BH 2240106381566</span>
          </>
        ),
      },
    ],
    [t],
  );

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
