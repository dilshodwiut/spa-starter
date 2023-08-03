import type { ChangeEventHandler } from "react";
import type { Layout, Form, Input, FormInstance, SelectProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TFunction } from "i18next";
import type { BaseEntity, ListResponse } from "@/types";

interface InspectorsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: ListResponse<InspectorType[]> | undefined;
  columns: ColumnsType<InspectorType>;
  colorBgContainer: string;
  paginationProps: TableProps<InspectorType>["pagination"];
  isTableLoading: boolean;
  contextHolder: React.ReactElement;
  onPageChange: TableProps<InspectorType>["onChange"];
  onAddClick: () => void;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  t: TFunction;
}

interface InspectorState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Form: typeof Form;
  Input: typeof Input;
  colorBgContainer: string;
  isModalOpen: boolean;
  inspectorId: string | undefined;
  form: FormInstance;
  isLoading: boolean;
  regions: SelectProps["options"];
  districts: SelectProps["options"];
  contextHolder: React.ReactElement;
  goBack: () => void;
  handleCancel: () => void;
  handleRegionChange: (value: number) => void;
  submitHandler: (values: FormValues) => void;
  t: TFunction;
}

type FormValues = Partial<InspectorType>;

interface InspectorType {
  id: number;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone: string;
  pinfl: string;
  passport_series: string;
  position: string;
  address: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  groups: BaseEntity;
  region: string;
  district: string;
  user_permissions: number[];
  password: string;
  deleted: string;
  deleted_by_cascade: boolean;
  middle_name: string;
  birth_date: string;
  gender: "man" | "woman";
  created_at: string;
  updated_at: string;
}

export type { InspectorsState, InspectorType, InspectorState, FormValues };
