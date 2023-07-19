import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { isInt } from "radash";
import { useDebounce } from "usehooks-ts";
import { compareAsc } from "date-fns";
import { t as T } from "@/utils/i18n";
import showTotal from "@/helpers/showTotal";
import { Layout, Tag, message, theme } from "antd";
import type { SegmentedProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import getColor from "../../helpers/getColor";
import { getAllActs, getArticles, getDocTypes, getRegions } from "../../api";
import type {
  ActStatus,
  ActsState,
  ActType,
  ViolationType,
  ActsStatus,
} from "../../types";

const columns: ColumnsType<ActType> = [
  // {
  //   title: T("type"),
  //   dataIndex: "server_type",
  // },

  {
    title: T("serial-number"),
    dataIndex: "act_series",
    render(value, record) {
      if (typeof value === "string") {
        return `${value} ${record.act_number}`;
      }
      return "";
    },
    sorter: (a, b) => {
      const aWhole = `${a.act_series} ${a.act_number}`;
      const bWhole = `${b.act_series} ${b.act_number}`;
      return aWhole.localeCompare(bWhole);
    },
  },
  {
    title: T("reg-date"),
    dataIndex: "act_date",
    sorter: (a, b) => compareAsc(new Date(a.act_date), new Date(b.act_date)),
  },
  {
    title: T("region, district"),
    dataIndex: "address",
  },

  // {
  //   title: T("type"),
  //   dataIndex: "client_type",
  //   sorter: (a, b) => 1,
  //   render(value) {
  //     return T(value);
  //   },
  // },
  // {
  //   title: T("violation"),
  //   dataIndex: "violation",
  // },
  // {
  //   title: T("amount (som)"),
  //   dataIndex: "amount",
  //   sorter: (a, b) => a.amount - b.amount,
  // },

  {
    title: T("type"),
    dataIndex: "violation_type",
    sorter: (a, b) => {
      if (a.violation_type !== null && b.violation_type !== null) {
        return 1;
      }

      return 0;
    },
    render: (value: ViolationType | null) =>
      value !== null ? (
        <Tag
          bordered={false}
          color={getColor(value)}
          className="p-1 w-full text-center"
        >
          {T(value ?? "")}
        </Tag>
      ) : null,
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

const { Header, Content } = Layout;

export default function useActsState(): ActsState {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const [{ page, pageSize }, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 20 });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<ActsStatus>("created");
  const [search, setSearch] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<number>();

  const debouncedSearch = useDebounce<string>(search);

  const { data, isLoading, isPreviousData, isPlaceholderData, error } =
    useQuery({
      queryKey: ["acts", { page, pageSize, status, debouncedSearch }],
      queryFn: async () => {
        const res = await getAllActs({
          page,
          page_size: pageSize,
          status,
          // search: debouncedSearch,
        });
        return res;
      },
      keepPreviousData: true,
      placeholderData: { count: 0, next: null, previous: null, results: [] },
    });

  const { data: locations } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let regions = locations?.results.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  regions ??= [];

  const districts = useMemo(() => {
    const location = locations?.results.find(
      (loc) => loc.id === selectedRegion,
    );

    if (typeof location !== "undefined") {
      return location?.districts.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }

    return [];
  }, [selectedRegion, locations?.results]);

  const { data: articlesData } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let articles = articlesData?.results.map(({ id, clause }) => ({
    label: clause,
    value: id,
  }));
  articles ??= [];

  const { data: violationDocs } = useQuery({
    queryKey: ["violation-docs"],
    queryFn: getDocTypes,
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let docs = violationDocs?.results.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  docs ??= [];

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

  const handleRegionChange = (value: number): void => {
    setSelectedRegion(value);
  };

  const onSegmentChange = (val: SegmentedProps["value"]): void => {
    setStatus(val as ActsStatus);
  };

  const onTableRow: TableProps<ActType>["onRow"] = (record) => ({
    onClick: () => {
      navigate(`${record.id}`);
    },
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const onPageChange: TableProps<ActType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    setPagination({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 20,
    });
    console.log("params", pagination, filters, sorter, extra);
  };

  const paginationProps = {
    defaultPageSize: 20,
    total: data?.count,
    showSizeChanger: true,
    showTotal,
    onShowSizeChange(current: number, size: number): void {
      console.log(current, size);
    },
  };

  useEffect(() => {
    if (error !== null) {
      // console.log(error?.statusText);
      void messageApi.error({
        key: "acts-error",
        content: error?.statusText,
      });
    }
  }, [error, messageApi]);

  return {
    Header,
    Content,
    data,
    isLoading,
    isPreviousData,
    isPlaceholderData,
    columns,
    colorBgContainer,
    paginationProps,
    isDrawerOpen,
    regions,
    districts,
    articles,
    docs,
    selectedRegion,
    contextHolder,
    showDrawer,
    closeDrawer,
    handleRegionChange,
    onPageChange,
    onDrawerClose,
    onTableRow,
    onSegmentChange,
    onSearchChange,
    t,
  };
}
