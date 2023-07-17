import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { random, shuffle } from "radash";
import { clone } from "ramda";
import { Button, Layout, theme } from "antd";
import { t as T } from "@/utils/i18n";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { InspectorsState, InspectorType } from "../types";
import { getAllInspectors } from "../api";

const columns: ColumnsType<InspectorType> = [
  {
    title: "№",
    render() {
      return 1;
    },
  },
  {
    title: T("fullname"),
    dataIndex: "full_name",
    sorter: (a, b) => 1,
  },
  {
    title: T("dob"),
    dataIndex: "dob",
  },
  {
    title: T("passport"),
    dataIndex: "passport",
  },
  {
    title: T("pinfl"),
    dataIndex: "pinfl",
    sorter: (a, b) => 1,
  },
  {
    title: T("job-title"),
    dataIndex: "job_title",
  },
  {
    title: T("region"),
    dataIndex: "region",
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

let data = await getAllInspectors();

for (let i = 0; i < 180; i += 1) {
  const clonedItem = clone(data[0]);
  clonedItem.id = random(5, 99999).toString();
  data.push(clonedItem);
}

data = shuffle(data);

// data = [];

const { Header, Content } = Layout;

const paginationProps = {
  defaultPageSize: 10,
  total: data.length,
  showSizeChanger: true,
  onShowSizeChange(current: number, size: number): void {
    console.log(current, size);
  },
};

const onPageChange: TableProps<InspectorType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function useInspectorsState(): InspectorsState {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t } = useTranslation();

  const onTableRow: TableProps<InspectorType>["onRow"] = (record, rowIndex) => {
    console.log(record, rowIndex);
    return {
      onClick: () => {
        navigate(`${record.id}`);
      },
    };
  };

  const onAddClick = (): void => {
    navigate("create-inspector");
  };

  return {
    Header,
    Content,
    data,
    columns,
    colorBgContainer,
    paginationProps,
    onPageChange,
    onTableRow,
    onAddClick,
    t,
  };
}
