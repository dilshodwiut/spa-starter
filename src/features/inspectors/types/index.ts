import type { Layout, Form, Input } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { JobTitle, Region } from "@/types";

interface InspectorsState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  data: InspectorType[];
  columns: ColumnsType<InspectorType>;
  colorBgContainer: string;
  paginationProps: TableProps<InspectorType>["pagination"];
  onPageChange: TableProps<InspectorType>["onChange"];
  onTableRow: TableProps<InspectorType>["onRow"];
  onAddClick: () => void;
}

interface InspectorState {
  Header: typeof Layout.Header;
  Content: typeof Layout.Content;
  Form: typeof Form;
  Input: typeof Input;
  colorBgContainer: string;
}

interface InspectorType {
  id: string;
  full_name: string;
  dob: string;
  passport: string;
  pinfl: string;
  job_title: JobTitle;
  region: Region;
}

export type { InspectorsState, InspectorType, InspectorState };
