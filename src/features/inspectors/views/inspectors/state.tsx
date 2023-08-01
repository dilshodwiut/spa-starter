import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDebounce } from "usehooks-ts";
import { Button, Layout, theme, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { InspectorsState, InspectorType } from "../../types";
import { getAllInspectors } from "../../api";

const { Header, Content } = Layout;

export default function useInspectorsState(): InspectorsState {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [{ page, pageSize }, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 20 });
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce<string>(search);

  const { data, isLoading, isPreviousData, isPlaceholderData, error } =
    useQuery({
      queryKey: ["inspectors", { page, pageSize, debouncedSearch }],
      queryFn: async () => {
        const res = await getAllInspectors({
          page,
          page_size: pageSize,
          search: debouncedSearch,
        });
        return res;
      },
      keepPreviousData: true,
      placeholderData: { count: 0, next: null, previous: null, results: [] },
    });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const onAddClick = (): void => {
    navigate("create-inspector");
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const onPageChange: TableProps<InspectorType>["onChange"] = (
    pagination,
    _filters,
    sorter,
    extra,
  ) => {
    setPagination({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 20,
    });
    console.log("params", pagination, _filters, sorter, extra);
  };

  const paginationProps = {
    defaultPageSize: 10,
    total: data?.count,
    showSizeChanger: true,
    onShowSizeChange(current: number, size: number): void {
      console.log(current, size);
    },
    locale: { items_per_page: "" },
  };

  const columns: ColumnsType<InspectorType> = useMemo(
    () => [
      {
        title: "№",
        render(_value, _record, index) {
          return index + 1;
        },
      },
      {
        title: t("fullname"),
        render(_value, record) {
          return `${record.last_name} ${record.first_name} ${
            record.middle_name ?? ""
          }`;
        },
        sorter: (a, b) => {
          const aWhole = `${a.last_name} ${a.first_name} ${
            a.middle_name ?? ""
          }`;
          const bWhole = `${b.last_name} ${b.first_name} ${
            b.middle_name ?? ""
          }`;
          return aWhole.localeCompare(bWhole);
        },
      },
      {
        title: t("dob"),
        dataIndex: "birth_date",
      },
      {
        title: t("passport"),
        dataIndex: "passport_series",
      },
      {
        title: t("pinfl"),
        dataIndex: "pinfl",
        sorter: (a, b) => a.pinfl.localeCompare(b.pinfl),
      },
      {
        title: t("job-title"),
        dataIndex: "position",
      },
      {
        title: t("region"),
        dataIndex: "region",
      },
      {
        title: t("action"),
        render(_value, record) {
          return (
            <Link to={`/inspectors/${record.id}`}>
              <Button className="bg-[#D8F3DC] text-[#40916C]">
                {t("see")}
              </Button>
            </Link>
          );
        },
      },
    ],
    [t],
  );

  useEffect(() => {
    if (error !== null) {
      void messageApi.error({
        key: "acts-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: error?.statusText ?? t("error-fetching-data"),
      });
    }
  }, [error, messageApi, t]);

  return {
    Header,
    Content,
    data,
    columns,
    colorBgContainer,
    paginationProps,
    isLoading,
    isPreviousData,
    isPlaceholderData,
    contextHolder,
    onPageChange,
    onAddClick,
    onSearchChange,
    t,
  };
}
