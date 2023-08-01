import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { BaseEntity, BaseParams, ListResponse, MediaFile } from "@/types";
import type {
  Layout,
  Typography,
  CardProps,
  Input,
  UploadProps,
  SegmentedProps,
  SelectProps,
  FormProps,
  FormInstance,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { NoticeType } from "antd/es/message/interface";
import type { CarouselRef } from "antd/es/carousel";
import type { TFunction } from "i18next";

type ViolationType = "administrative" | "criminal";
type ActStatus = "received" | "new" | number;
type ActsStatus = "created" | "defined" | "sent" | "rejected" | "performed";

type getColorFn = (
  input: ViolationType, // | ActStatus
) => "blue" | "green" | "default"; // | "orange" | "red"

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
  onDispatchAction: (() => void) | (() => Promise<void>);
  className?: string;
  Icon?: any;
  iconPosition?: "left" | "right";
  isDisabled?: boolean;
  isLoading?: boolean;
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

interface ActionInProcess {
  admin: boolean;
  criminal: boolean;
  cancel: boolean;
}

interface ActState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Title: typeof Typography.Title;
  TextArea: typeof Input.TextArea;
  contextHolder: React.ReactElement;
  colorBgContainer: string;
  uploadProps: UploadProps;
  isModalOpen: boolean;
  isCarouselModalOpen: boolean;
  isActsModalOpen: boolean;
  data: ActType | undefined;
  actsList: Array<{ id: number; series: string; number: string }>;
  violationTypes: Violation[];
  carouselRef: React.RefObject<CarouselRef>;
  isCurrFetching: boolean;
  actionInProcess: ActionInProcess;
  violTypeMutation: UseMutationResult<
    void,
    unknown,
    {
      violation_type?: number | undefined;
    },
    unknown
  >;
  note: string;
  handleOk: () => void;
  handleCancel: () => void;
  handleCarouselModalCancel: () => void;
  handleActsModalCancel: () => void;
  showModal: () => void;
  showActsList: () => void;
  notify: (successMessage: string, type: NoticeType) => Promise<void>;
  goBack: () => void;
  onImgClick: (index: number) => void;
  renderFile: (file: MediaFile) => React.ReactNode;
  setNote: Dispatch<SetStateAction<string>>;
  t: TFunction;
}

interface ActType {
  id: number;
  status: ActsStatus;
  parent_id: number;

  series: string;
  number: string;

  act_series: string;
  act_number: string;

  act_date: string;
  created_at: string;
  region: BaseEntity;
  district: BaseEntity;

  violation_type: number;

  server_type: "government" | "power_industry";
  client_type: "legal_entity" | "individual" | "budget_organization";
  violation: string;
  amount: number;

  files: MediaFile[];

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
    avatar: string;
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
  min_date: string | null;
  max_date: string | null;
  region_id: number | null;
  district_id: number | null;
  violation_type: number | null;
}

interface ActsParams extends Partial<FormFilters>, BaseParams {
  status?: ActsStatus;
  search?: string;

  series?: string;
  number?: string;
}

interface FilterForm {
  district: number | undefined;
  doc_type: number[] | undefined;
  infringement_article: number | undefined;
  region: number | undefined;
  violation_type: number | undefined;
  violation_date: [{ $d: Date }, { $d: Date }] | null;
}

interface Article {
  id: number;
  clause: string;
  small_clause: string;
  description: string;
  part: string;
}

interface ViolationDoc extends BaseEntity {}

interface Violation extends BaseEntity {
  key: ViolationType;
}

interface ActsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: ListResponse<ActType[]> | undefined;
  isTableLoading: boolean;
  columns: ColumnsType<ActType>;
  colorBgContainer: string;
  paginationProps: TableProps<ActType>["pagination"];
  isDrawerOpen: boolean;
  regions: SelectProps["options"];
  districts: SelectProps["options"];
  articles: SelectProps["options"];
  docs: SelectProps["options"];
  violationTypes: SelectProps["options"];
  selectedRegion: number | undefined;
  contextHolder: React.ReactElement;
  form: FormInstance;
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
