import { useState } from "react";
import { random, shuffle } from "radash";
import { clone } from "ramda";
import { Layout, Tag, theme } from "antd";
import type { DatePickerProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

type ViolationType = "administrative" | "criminal";
type Status = "received" | number;

interface DataType {
  key: React.Key;
  server_type: "government" | "power_industry";
  serial_num: string;
  date_of_registration: string;
  region: string;
  client_type: "legal_entity" | "individual" | "budget_organization";
  violation: string;
  amount: number;
  violation_type: ViolationType;
  status: Status;
}

type getColorFn = (
  input: ViolationType | Status,
) => "processing" | "green" | "default" | "orange" | "red" | "";

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

const columns: ColumnsType<DataType> = [
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
    render: (value: Status) => (
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

let data: DataType[] = [
  {
    key: "1",
    server_type: "government",
    serial_num: "BH 234872342348",
    date_of_registration: "04.06.2023",
    region: "Bukhara region, Shofirkon region",
    client_type: "individual",
    violation: "133, 1, 3",
    amount: 2050000,
    violation_type: "administrative",
    status: 9,
  },
  {
    key: "2",
    server_type: "power_industry",
    serial_num: "BH 348583475738",
    date_of_registration: "04.06.2023",
    region: "Bukhara region, Shofirkon region",
    client_type: "legal_entity",
    violation: "133, 1, 3",
    amount: 1980000,
    violation_type: "administrative",
    status: 1,
  },
  {
    key: "3",
    server_type: "power_industry",
    serial_num: "BH 4583453423",
    date_of_registration: "04.06.2023",
    region: "Bukhara region, Shofirkon region",
    client_type: "budget_organization",
    violation: "133, 1, 3",
    amount: 2050000,
    violation_type: "criminal",
    status: "received",
  },
  {
    key: "4",
    server_type: "power_industry",
    serial_num: "BH 5868222123",
    date_of_registration: "04.06.2023",
    region: "Bukhara region, Shofirkon region",
    client_type: "legal_entity",
    violation: "133, 1, 3",
    amount: 850490,
    violation_type: "criminal",
    status: 1,
  },
];

for (let i = 0; i < 177; i += 1) {
  const idx = shuffle([0, 1, 2, 3])[0];
  const clonedItem = clone(data[idx]);
  clonedItem.key = random(5, 99999);
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

const onPageChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

interface ActsListState {
  Header: typeof Header;
  Content: typeof Content;
  data: typeof data;
  columns: typeof columns;
  colorBgContainer: string;
  paginationProps: typeof paginationProps;
  typeOptions: typeof typeOptions;
  isDrawerOpen: boolean;
  showDrawer: () => void;
  handleChange: (value: string) => void;
  onPageChange?: typeof onPageChange;
  onDrawerClose: () => void;
  onDateChange?: DatePickerProps["onChange"];
  onTypeChange: (checkedValues: CheckboxValueType[]) => void;
}

export default function useActsListState(): ActsListState {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = (): void => {
    setIsDrawerOpen(true);
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
    handleChange,
    onPageChange,
    onDrawerClose,
    onDateChange,
    onTypeChange,
  };
}

function showTotal(total: number, range: [number, number]): React.ReactElement {
  return (
    <span className="text-[#8498B4]">
      Acts are shown {range[0]}-{range[1]} out of {total}
    </span>
  );
}
