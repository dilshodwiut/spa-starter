import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDebounce } from "usehooks-ts";
import { useAuthContext } from "@/contexts";
import { Button, Layout, Modal, theme, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { InspectorsState, InspectorType } from "../../types";
import { deleteInspector, getAllInspectors } from "../../api";

const { Header, Content } = Layout;

const { confirm } = Modal;

export default function useInspectorsState(): InspectorsState {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const [{ page, pageSize }, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 20 });
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce<string>(search);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    isPlaceholderData,
    error,
  } = useQuery({
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

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteInspector,
    onSuccess: () => {
      void queryClient.invalidateQueries(["inspectors"]);
    },
    onError: (_error: { data: { detail: string } }) => {
      void messageApi.error({
        content: _error.data.detail,
      });
    },
  });

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

  const showDeleteModal = (record: InspectorType): void => {
    confirm({
      title: t("sure-delete-inspector"),
      icon: <ExclamationCircleFilled />,
      content: `${record.last_name ?? ""} ${record.first_name ?? ""} ${
        record.middle_name ?? ""
      }`,
      okText: t("yes"),
      okType: "danger",
      cancelText: t("no"),
      okButtonProps: { loading: isDeleting },
      onOk() {
        mutate(record.id);
      },
    });
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

  const isTableLoading =
    isLoading || isPreviousData || isPlaceholderData || isFetching;

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
            <div className="flex gap-4">
              <Link to={`/inspectors/${record.id}`}>
                <Button className="bg-[#D8F3DC] text-[#40916C]">
                  {t("see")}
                </Button>
              </Link>
              {user.is_superuser ? (
                <Button
                  danger
                  onClick={() => {
                    showDeleteModal(record);
                  }}
                >
                  {t("delete")}
                </Button>
              ) : null}
            </div>
          );
        },
      },
    ],
    [],
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
    isTableLoading,
    contextHolder,
    onPageChange,
    onAddClick,
    onSearchChange,
    t,
  };
}
