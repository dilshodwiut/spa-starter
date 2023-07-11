import type {
  Layout,
  Typography,
  CardProps,
  DatePickerProps,
  Input,
  UploadProps,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  AbstractCheckboxGroupProps,
  CheckboxValueType,
} from "antd/es/checkbox/Group";
import type { NoticeType } from "antd/es/message/interface";

type ViolationType = "administrative" | "criminal";
type ActStatus = "received" | number;

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
  title: CardProps["title"];
  // [T in keyof]: CardProps
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
}

interface ActType {
  id: string;
  server_type: "government" | "power_industry";
  serial_num: string;
  date_of_registration: string;
  region: string;
  client_type: "legal_entity" | "individual" | "budget_organization";
  violation: string;
  amount: number;
  violation_type: ViolationType;
  status: ActStatus;
}

interface ActsListState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: ActType[];
  columns: ColumnsType<ActType>;
  colorBgContainer: string;
  paginationProps: TableProps<ActType>["pagination"];
  typeOptions: AbstractCheckboxGroupProps["options"];
  isDrawerOpen: boolean;
  showDrawer: () => void;
  closeDrawer: () => void;
  onDrawerClose: () => void;
  handleChange: (value: string) => void;
  onPageChange: TableProps<ActType>["onChange"];
  onDateChange: DatePickerProps["onChange"];
  onTableRow: TableProps<ActType>["onRow"];
  onTypeChange: (checkedValues: CheckboxValueType[]) => void;
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
  ActsListState,
  ActType,
};
