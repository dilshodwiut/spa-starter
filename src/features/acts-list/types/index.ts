import type { ChangeEventHandler } from "react";
import type { Region } from "@/types";
import type {
  Layout,
  Typography,
  CardProps,
  DatePickerProps,
  Input,
  UploadProps,
  SegmentedProps,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  AbstractCheckboxGroupProps,
  CheckboxValueType,
} from "antd/es/checkbox/Group";
import type { NoticeType } from "antd/es/message/interface";
import type { TFunction } from "i18next";

type ViolationType = "administrative" | "criminal";
type ActStatus = "received" | "new" | number;
type ActsStatus = "processed" | "non-processed" | "cancelled" | "overdued";

type getColorFn = (
  input: ViolationType | ActStatus,
) => "processing" | "green" | "default" | "orange" | "red" | "";

type ActionBoxColor = "blue" | "green" | "grey" | "red";
type ActionKey = "F5" | "F6" | "F7" | "F8" | "F9";

interface ActionBoxIconPlaceholder {
  left: React.ReactNode;
  right: React.ReactNode;
}

interface ActionBoxProps {
  children: React.ReactNode;
  color: ActionBoxColor;
  actionKey: ActionKey;
  onDispatchAction: () => void;
  className?: string;
  Icon?: any;
  iconPosition?: "left" | "right";
}

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  title?: CardProps["title"];
}

interface InfoProps {
  of: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  ofClassName?: string;
  valueClassName?: string;
  children?: React.ReactNode;
}

interface ActState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Title: typeof Typography.Title;
  TextArea: typeof Input.TextArea;
  contextHolder: React.ReactElement;
  colorBgContainer: string;
  actId: string | undefined;
  uploadProps: UploadProps;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  showModal: () => void;
  doSomeAction: (successMessage: string, type: NoticeType) => Promise<void>;
  t: TFunction;
}

interface ActType {
  id: string;
  status: ActStatus;
  act_series: string;
  act_number: string;
  act_date: string;
  address: string;

  violation_type: ViolationType;

  server_type: "government" | "power_industry";
  client_type: "legal_entity" | "individual" | "budget_organization";
  violation: string;
  amount: number;
}

interface Response<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

interface ActsParams {
  page?: number;
  page_size?: number;
  status?: ActsStatus;
  search?: string;
}

interface ActsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: Response<ActType[]> | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
  isPlaceholderData: boolean;
  columns: ColumnsType<ActType>;
  colorBgContainer: string;
  paginationProps: TableProps<ActType>["pagination"];
  typeOptions: AbstractCheckboxGroupProps["options"];
  isDrawerOpen: boolean;
  regions: Response<Region[]> | undefined;
  contextHolder: React.ReactElement;
  showDrawer: () => void;
  closeDrawer: () => void;
  onDrawerClose: () => void;
  handleChange: (value: string) => void;
  onPageChange: TableProps<ActType>["onChange"];
  onDateChange: DatePickerProps["onChange"];
  onTableRow: TableProps<ActType>["onRow"];
  onTypeChange: (checkedValues: CheckboxValueType[]) => void;
  onSegmentChange: SegmentedProps["onChange"];
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  t: TFunction;
}

export type {
  ViolationType,
  ActStatus,
  getColorFn,
  ActionBoxColor,
  ActionKey,
  ActionBoxIconPlaceholder,
  ActionBoxProps,
  CustomCardProps,
  InfoProps,
  ActState,
  ActsState,
  ActType,
  ActsParams,
  ActsStatus,
  Response,
};
