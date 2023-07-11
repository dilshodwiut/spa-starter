import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { random, shuffle } from "radash";
import { clone } from "ramda";
import { Layout, Tag, theme } from "antd";
import type { DatePickerProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type {
  ActStatus,
  ActsListState,
  ActType,
  ViolationType,
  getColorFn,
} from "../../types";
import { getAllActs } from "../../api";

const getColor: getColorFn = (input) => {
  const map = {
    administrative: "processing",
    criminal: "green",
    received: "default",
  } as const;

  if (typeof input === "number") {
    if (input > 3) return "green";
    if (input > 1) return "orange";
    return "red";
  }

  return input in map ? map[input] : "";
};

const columns: ColumnsType<ActType> = [
  {
    title: "Type",
    dataIndex: "server_type",
  },
  {
    title: "Serial number",
    dataIndex: "serial_num",
    sorter: (a, b) => 1,
  },
  {
    title: "Date of Registration",
    dataIndex: "date_of_registration",
    sorter: (a, b) => 1,
  },
  {
    title: "Region",
    dataIndex: "region",
  },
  {
    title: "Type",
    dataIndex: "client_type",
    sorter: (a, b) => 1,
  },
  {
    title: "Violation",
    dataIndex: "violation",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Type",
    dataIndex: "violation_type",
    sorter: (a, b) => 1,
    render: (value: ViolationType) => (
      <Tag
        bordered={false}
        color={getColor(value)}
        className="p-1 w-full text-center"
      >
        {`${value} days`}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (value: ActStatus) => (
      <Tag
        bordered={false}
        color={getColor(value)}
        className="p-1 w-full text-center"
      >
        {`${value} days`}
      </Tag>
    ),
  },
];

let data = await getAllActs();

for (let i = 0; i < 177; i += 1) {
  const idx = shuffle([0, 1, 2, 3])[0];
  const clonedItem = clone(data[idx]);
  clonedItem.id = random(5, 99999).toString();
  data.push(clonedItem);
}

data = shuffle(data);

// data = [];

const { Header, Content } = Layout;

const typeOptions = [
  {
    label: "Regional electrical networks",
    value: "regional_electrical_networks",
  },
  { label: "Uzenergyinspection", value: "uzeneryoinspection" },
];

const paginationProps = {
  defaultPageSize: 20,
  total: data.length,
  showSizeChanger: true,
  showTotal,
  onShowSizeChange(current: number, size: number): void {
    console.log(current, size);
  },
};

const onPageChange: TableProps<ActType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function useActsListState(): ActsListState {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const showDrawer = (): void => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = (): void => {
    setIsDrawerOpen(false);
  };

  const onDrawerClose = (): void => {
    setIsDrawerOpen(false);
  };

  const handleChange = (value: string): void => {
    console.log(`selected ${value}`);
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onTypeChange = (checkedValues: CheckboxValueType[]): void => {
    console.log("checked = ", checkedValues);
  };

  const onTableRow: TableProps<ActType>["onRow"] = (record, rowIndex) => {
    console.log(record, rowIndex);
    return {
      onClick: () => {
        navigate(`${record.id}`);
      },
    };
  };

  return {
    Header,
    Content,
    data,
    columns,
    colorBgContainer,
    paginationProps,
    typeOptions,
    isDrawerOpen,
    showDrawer,
    closeDrawer,
    handleChange,
    onPageChange,
    onDrawerClose,
    onDateChange,
    onTypeChange,
    onTableRow,
  };
}

function showTotal(total: number, range: [number, number]): React.ReactElement {
  return (
    <span className="text-[#8498B4]">
      Acts are shown {range[0]}-{range[1]} out of {total}
    </span>
  );
}
