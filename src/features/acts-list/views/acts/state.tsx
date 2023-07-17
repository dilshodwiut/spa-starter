import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isInt, random, shuffle } from "radash";
import { clone } from "ramda";
import { Layout, Tag, theme } from "antd";
import { useTranslation } from "react-i18next";
import { t as T } from "@/utils/i18n";
import type { DatePickerProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type {
  ActStatus,
  ActsState,
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
    title: T("type"),
    dataIndex: "server_type",
  },
  {
    title: T("serial-number"),
    dataIndex: "serial_num",
    sorter: (a, b) => 1,
  },
  {
    title: T("reg-date"),
    dataIndex: "date_of_registration",
    sorter: (a, b) => 1,
  },
  {
    title: T("region, district"),
    dataIndex: "region",
  },
  {
    title: T("type"),
    dataIndex: "client_type",
    sorter: (a, b) => 1,
    render(value) {
      return T(value);
    },
  },
  {
    title: T("violation"),
    dataIndex: "violation",
  },
  {
    title: T("amount (som)"),
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: T("type"),
    dataIndex: "violation_type",
    sorter: (a, b) => 1,
    render: (value: ViolationType) => (
      <Tag
        bordered={false}
        color={getColor(value)}
        className="p-1 w-full text-center"
      >
        {T(value)}
      </Tag>
    ),
  },
  {
    title: T("status"),
    dataIndex: "status",
    render: (value: ActStatus) => (
      <Tag
        bordered={false}
        color={getColor(value)}
        className="p-1 w-full text-center"
      >
        {isInt(value) ? `${value} days` : T(value)}
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
    label: T("regional_electrical_networks"),
    value: "regional_electrical_networks",
  },
  { label: T("area_gas_supply"), value: "area_gas_supply" },
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

export default function useActsState(): ActsState {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

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
    t,
  };
}

function showTotal(total: number, range: [number, number]): React.ReactElement {
  return (
    <span className="text-[#8498B4]">
      {T("acts-shown")} {range[0]}-{range[1]} {T("out-of")} {total}
    </span>
  );
}
