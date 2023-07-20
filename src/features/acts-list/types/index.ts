import type { ChangeEventHandler } from "react";
import type { BaseEntity, BaseParams, ListResponse } from "@/types";
import type {
  Layout,
  Typography,
  CardProps,
  Input,
  UploadProps,
  SegmentedProps,
  SelectProps,
  FormProps,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { AbstractCheckboxGroupProps } from "antd/es/checkbox/Group";
import type { NoticeType } from "antd/es/message/interface";
import type { TFunction } from "i18next";

type ViolationType = "administrative" | "criminal";
type ActStatus = "received" | "new" | number;
type ActsStatus = "created" | "defined" | "sent" | "rejected" | "performed";

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
  data: ActType | undefined;
  handleOk: () => void;
  handleCancel: () => void;
  showModal: () => void;
  doSomeAction: (successMessage: string, type: NoticeType) => Promise<void>;
  goBack: () => void;
  t: TFunction;
}

interface ActType {
  id: number;
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

  logo: string;
  is_juridic: string;
  total_sum: number;
  total_volume: number;

  employee: {
    certificate: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    position: string;
    organization: BaseEntity;
  };

  violation_person: {
    phone: string;
    last_name: string;
    first_name: string;
    birth_date: string;
    middle_name: string;
    citizenship: string;
    nationality: string;
    place_of_birth: string;
    document_series: string;
    document_number: string;
  };

  violation_organization: {
    subscriber_number: string;
    cadastral_number: string;
    director_fio: string;
    address: string;
    name: string;
    type: string;
    stir: string;
    phone: string;
  };
}

interface FormFilters {
  doc_type_id: number[] | null;
  date: string | null;
  region_id: number | null;
  district_id: number | null;
  violation_type: number | null;
}

interface ActsParams extends Partial<FormFilters>, BaseParams {
  status?: ActsStatus;
  search?: string;
}

interface FilterForm {
  district: number | undefined;
  doc_type: number[] | undefined;
  infringement_article: number | undefined;
  region: number | undefined;
  violation_type: number | undefined;
  violation_date: { $d: Date } | null;
}

interface Article {
  id: number;
  clause: string;
  small_clause: string;
  description: string;
  part: string;
}

interface ViolationDoc extends BaseEntity {}

interface Violation extends ViolationDoc {}

interface ActsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: ListResponse<ActType[]> | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
  isPlaceholderData: boolean;
  columns: ColumnsType<ActType>;
  colorBgContainer: string;
  paginationProps: TableProps<ActType>["pagination"];
  isDrawerOpen: boolean;
  regions: SelectProps["options"];
  districts: SelectProps["options"];
  articles: SelectProps["options"];
  docs: AbstractCheckboxGroupProps["options"];
  violationTypes: SelectProps["options"];
  selectedRegion: number | undefined;
  contextHolder: React.ReactElement;
  showDrawer: () => void;
  closeDrawer: () => void;
  onDrawerClose: () => void;
  handleRegionChange: (value: number) => void;
  onPageChange: TableProps<ActType>["onChange"];
  onTableRow: TableProps<ActType>["onRow"];
  onSegmentChange: SegmentedProps["onChange"];
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onFiltersApply: FormProps["onFinish"];
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
  FormFilters,
  FilterForm,
  Article,
  Violation,
  ViolationDoc,
};
