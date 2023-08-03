import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
// import { isInt } from "radash";
import { useDebounce } from "usehooks-ts";
import { compareAsc, lightFormat } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ShowTotal from "@/components/show-total";
import { Layout, Tag, Form, message, theme, Tooltip } from "antd";
import type { SegmentedProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import placeholderIcon from "@/assets/image-placeholder.svg";
import getColor from "../../helpers/get-color";
import formatDate from "../../helpers/format-date";
import formatAmount from "../../helpers/format-amount";
import {
  getAllActs,
  getArticles,
  getDocTypes,
  getRegions,
  getViolationTypes,
} from "../../api";
import type {
  // ActStatus,
  ActsState,
  ActType,
  ActsStatus,
  FormFilters,
  FilterForm,
} from "../../types";

const { Header, Content } = Layout;

export default function useActsState(): ActsState {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const form = Form.useForm()[0];

  const [{ page, pageSize }, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 20 });

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<ActsStatus>("created");
  const [search, setSearch] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<number>();
  const [filters, setFilters] = useState<FormFilters>({
    doc_type_id: [],
    min_date: null,
    max_date: null,
    region_id: null,
    district_id: null,
    violation_type: null,
  });

  const debouncedSearch = useDebounce<string>(search);

  const {
    data,
    isLoading,
    isPreviousData,
    isPlaceholderData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["acts", { page, pageSize, status, debouncedSearch, ...filters }],
    queryFn: async () => {
      const res = await getAllActs({
        page,
        page_size: pageSize,
        status,
        search: debouncedSearch,
        doc_type_id: filters.doc_type_id,
        min_date: filters.min_date,
        max_date: filters.max_date,
        region_id: filters.region_id,
        district_id: filters.district_id,
        violation_type: filters.violation_type,
      });
      return res;
    },
    keepPreviousData: true,
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  const { data: locations } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await getRegions();
      return res;
    },
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
    queryFn: async () => {
      const res = await getArticles();
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let articles = articlesData?.results.map(({ id, clause }) => ({
    label: clause,
    value: id,
  }));
  articles ??= [];

  const { data: violationDocs } = useQuery({
    queryKey: ["violation-docs"],
    queryFn: async () => {
      const res = await getDocTypes();
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let docs = violationDocs?.results.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  docs ??= [];

  const { data: violationsData } = useQuery({
    queryKey: ["violation-types"],
    queryFn: async () => {
      const res = await getViolationTypes();
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let violationTypes = violationsData?.results.map(({ id, name, key }) => ({
    label: name,
    value: id,
    key,
  }));
  violationTypes ??= [];

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
    form.setFieldValue("district", undefined);
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

  const onFiltersApply = (values: FilterForm): void => {
    const draft: FormFilters = {
      doc_type_id: [],
      min_date: null,
      max_date: null,
      region_id: null,
      district_id: null,
      violation_type: null,
    };

    if (typeof values.doc_type !== "undefined") {
      draft.doc_type_id = values.doc_type;
    }

    if (values.violation_date !== null) {
      draft.min_date = lightFormat(values.violation_date[0].$d, "yyyy-MM-dd");
      draft.max_date = lightFormat(values.violation_date[0].$d, "yyyy-MM-dd");
    }

    if (typeof values.region !== "undefined") {
      draft.region_id = values.region;
    }

    if (typeof values.district !== "undefined") {
      draft.district_id = values.district;
    }

    if (typeof values.infringement_article !== "undefined") {
      // draft. = values.infringement_article;
    }

    if (typeof values.violation_type !== "undefined") {
      draft.violation_type = values.violation_type;
    }

    setFilters(draft);
    closeDrawer();
  };

  const paginationProps = {
    defaultPageSize: 20,
    total: data?.count,
    showSizeChanger: true,
    showTotal(total: number, range: [number, number]) {
      return <ShowTotal total={total} range={range} />;
    },
    onShowSizeChange(current: number, size: number): void {
      console.log(current, size);
    },
    locale: { items_per_page: "" },
  };

  const isTableLoading =
    isLoading || isPreviousData || isPlaceholderData || isFetching;

  const columns: ColumnsType<ActType> = useMemo(
    () => [
      {
        title: t("org-type"),
        dataIndex: "logo",
        render(value: string, record: ActType) {
          return (
            <Tooltip title={record.employee?.organization?.name}>
              <LazyLoadImage
                src={
                  value !== "" && typeof value === "string"
                    ? `${import.meta.env.VITE_CDN_URL}${value}`
                    : placeholderIcon
                }
                alt={record.employee.organization.name}
                effect="opacity"
                style={{
                  borderRadius: "6px",
                }}
                onError={(e) => {
                  console.log(e);
                  e.target.onerror = null;
                  e.target.src = placeholderIcon;
                }}
              />
            </Tooltip>
          );
        },
      },
      {
        title: t("serial-number"),
        dataIndex: "series",
        render(value, record) {
          if (typeof value === "string") {
            return `${value} ${record.number}`;
          }
          return "";
        },
        sorter: (a, b) => {
          const aWhole = `${a.series} ${a.number}`;
          const bWhole = `${b.series} ${b.number}`;
          return aWhole.localeCompare(bWhole);
        },
      },
      {
        title: t("reg-date"),
        dataIndex: "act_date",
        render(value: string, record: ActType) {
          return (
            <Tooltip title={formatDate(record.created_at, "dd.MM.yyyy HH:mm")}>
              {formatDate(value)}
            </Tooltip>
          );
        },
        sorter: (a, b) =>
          compareAsc(new Date(a.act_date), new Date(b.act_date)),
      },
      {
        title: t("region, district"),
        render(record: ActType) {
          return `${record.region.name}, ${record.district.name}`;
        },
      },

      {
        title: t("type"),
        dataIndex: "is_juridic",
        sorter: (a, b) => +a.is_juridic - +b.is_juridic,
        render(isJuridic: boolean) {
          if (isJuridic) {
            return t("legal_entity");
          }
          return t("individual");
        },
      },
      {
        title: t("violation"),
      },
      {
        title: t("amount (som)"),
        dataIndex: "total_sum",
        sorter: (a, b) => a.total_sum - b.total_sum,
        render(sum: number) {
          return formatAmount(sum);
        },
      },

      {
        title: t("type"),
        dataIndex: "violation_type",
        sorter: (a, b) => {
          if (a.violation_type !== null && b.violation_type !== null) {
            return 1;
          }

          return 0;
        },
        render: (value: number) => {
          const violation = violationTypes?.find(
            (viol) => viol.value === value,
          );

          if (violation !== undefined) {
            return (
              <Tag
                bordered={false}
                color={getColor(violation.key)}
                className="p-1 w-full text-center"
              >
                {violation.label}
              </Tag>
            );
          }

          return "";
        },
      },
      // {
      //   title: t("status"),
      //   dataIndex: "status",
      //   render: (value: ActStatus) => (
      //     <Tag
      //       bordered={false}
      //       color={getColor(value)}
      //       className="p-1 w-full text-center"
      //     >
      //       {isInt(value) ? `${value} days` : t(value)}
      //     </Tag>
      //   ),
      // },
    ],
    [violationTypes, t],
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
    isTableLoading,
    columns,
    colorBgContainer,
    paginationProps,
    isDrawerOpen,
    regions,
    districts,
    articles,
    docs,
    violationTypes,
    selectedRegion,
    contextHolder,
    form,
    showDrawer,
    closeDrawer,
    handleRegionChange,
    onPageChange,
    onDrawerClose,
    onTableRow,
    onSegmentChange,
    onSearchChange,
    onFiltersApply,
    t,
  };
}
