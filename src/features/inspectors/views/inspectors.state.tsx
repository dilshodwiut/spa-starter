import { useNavigate } from "react-router-dom";
import { random, shuffle } from "radash";
import { clone } from "ramda";
import { Layout, theme } from "antd";
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
    title: "Full name",
    dataIndex: "full_name",
    sorter: (a, b) => 1,
  },
  {
    title: "Date of birth",
    dataIndex: "dob",
  },
  {
    title: "Passport",
    dataIndex: "passport",
  },
  {
    title: "PINFL",
    dataIndex: "pinfl",
    sorter: (a, b) => 1,
  },
  {
    title: "Job Title",
    dataIndex: "job_title",
  },
  {
    title: "Region",
    dataIndex: "region",
  },
  {
    title: "Action",
    render() {
      return "a";
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
  };
}
