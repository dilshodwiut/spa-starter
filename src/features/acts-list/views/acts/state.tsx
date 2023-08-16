import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDebounce } from "usehooks-ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import qs from "query-string";
import { Layout, Tag, Form, message, theme, Tooltip } from "antd";
import formatAmount from "@/helpers/format-amount";
import ShowTotal from "@/components/show-total";
import placeholderIcon from "@/assets/image-placeholder.svg";
import type { SegmentedProps } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import getColor from "../../helpers/get-color";
import formatDate from "../../helpers/format-date";
import {
  getAllActs,
  getArticles,
  getDocTypes,
  getRegions,
  getViolationTypes,
} from "../../api";
import type {
  ActsState,
  ActType,
  ActsStatus,
  FormFilters,
  FilterForm,
  DateObj,
  Option,
} from "../../types";
import secondsToDate from "../../helpers/seconds-to-date";
import renderArticlesById from "../../helpers/render-articles-by-id";
import {
  articlesQuery,
  regionsQuery,
  violationDocsQuery,
  violationTypesQuery,
} from "../../queries";

const { Header, Content } = Layout;

const defaultParams =
  "page=1&page_size=20&status=created&min_date=&max_date=&doc_type_id=&region_id=&district_id=&violation_type=&search=";

export default function useActsState(): ActsState {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const form = Form.useForm()[0];
  const [searchParams, setSearchParams] = useSearchParams(
    window.location.search === "" ? defaultParams : window.location.search,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const [selectedRegion, setSelectedRegion] = useState<number>();

  const debouncedSearch = useDebounce<string>(search);

  const {
    data,
    isLoading,
    isPreviousData,
    isPlaceholderData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["acts", { ...searchParams.parse(), search: debouncedSearch }],
    queryFn: async () => {
      const res = await getAllActs({
        page: +(searchParams.get("page") ?? 1),
        page_size: +(searchParams.get("page_size") ?? 20),
        status: (searchParams.get("status") ?? "created") as ActsStatus,
        search: debouncedSearch,
        doc_type_id:
          searchParams.getAll("doc_type_id")[0] === ""
            ? [""]
            : searchParams.getAll("doc_type_id").map(Number),
        min_date: searchParams.get("min_date") ?? "",
        max_date: searchParams.get("max_date") ?? "",
        region_id: searchParams.get("region_id") ?? "",
        district_id: searchParams.get("district_id") ?? "",
        violation_type: searchParams.get("violation_type") ?? "",
      });
      return res;
    },
    keepPreviousData: true,
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  const { data: locations } = useQuery({
    ...regionsQuery(),
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
    ...articlesQuery(),
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let articles = articlesData?.results.map(({ id, clause }) => ({
    label: clause,
    value: id,
  }));
  articles ??= [];

  const { data: violationDocs } = useQuery({
    ...violationDocsQuery(),
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let docs = violationDocs?.results.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  docs ??= [];

  const { data: violationsData } = useQuery({
    ...violationTypesQuery(),
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
    setSearchParams({ ...searchParams.parse(), status: val as ActsStatus });
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
    _sorter,
    _extra,
  ) => {
    setSearchParams({
      ...searchParams.parse(),
      page: pagination.current?.toString() ?? "1",
      page_size: pagination.pageSize?.toString() ?? "20",
    });
  };

  const onFiltersApply = (values: FilterForm): void => {
    const draft: FormFilters = {
      doc_type_id: [""],
      min_date: "",
      max_date: "",
      region_id: "",
      district_id: "",
      violation_type: "",
    };

    if (typeof values.doc_type !== "undefined" && values.doc_type.length > 0) {
      draft.doc_type_id = values.doc_type;
    }

    if (values.violation_date !== null) {
      draft.min_date = dayjs(values.violation_date[0].$d).format("YYYY-MM-DD");
      draft.max_date = dayjs(values.violation_date[0].$d).format("YYYY-MM-DD");
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

    // we need to stringify it first to satisfy ts, otherwise it complains because of
    // FormFilters index signature mismatch with setSearchParams argument type
    const nextInit = { ...searchParams.parse(), ...draft };
    setSearchParams(qs.stringify(nextInit));
    closeDrawer();
  };

  const displayDeadline = (dateObj: DateObj, hasPassed = false): string => {
    const orderedKeys = ["days", "hours"] as const;
    let output = "";

    orderedKeys.forEach((key) => {
      if (typeof dateObj[key] !== "undefined") {
        output += `${dateObj[key] ?? ""} ${t(key)} `;
      }
    });

    if (output === "") {
      output += t("no time remained");
    } else {
      output += hasPassed ? t("passed") : t("remained");
    }

    return output;
  };

  const paginationProps = {
    defaultCurrent: +(searchParams.get("page") ?? 1),
    defaultPageSize: +(searchParams.get("page_size") ?? 20),
    total: data?.count,
    showSizeChanger: true,
    showTotal(total: number, range: [number, number]) {
      return <ShowTotal total={total} range={range} />;
    },
    onShowSizeChange(current: number, size: number): void {
      setSearchParams({
        ...searchParams.parse(),
        page: current.toString(),
        page_size: size.toString(),
      });
    },
    locale: { items_per_page: "" },
  };

  const isTableLoading =
    isLoading || isPreviousData || isPlaceholderData || isFetching;

  const columns = useMemo(() => {
    const allColumns: ColumnsType<ActType> = [
      {
        title: t("org-type"),
        dataIndex: "logo",
        render(value: string, record: ActType) {
          return (
            <Tooltip title={record.employee?.organization?.name}>
              <div className="flex items-center">
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
                  width={50}
                  height="100%"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = placeholderIcon;
                  }}
                />
              </div>
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
            <Tooltip title={formatDate(record.created_at, "DD.MM.YYYY HH:mm")}>
              {formatDate(value)}
            </Tooltip>
          );
        },
        sorter: (a, b) => {
          const isAsc = dayjs(a.act_date).isBefore(b.act_date);
          if (isAsc) return -1;
          return 1;
        },
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
        dataIndex: "violation",
        render(value: {
          law_article_id: number;
          additional_articles: Array<{ law_article_id: number }>;
        }) {
          return renderArticlesById(articles as Option[], [
            { law_article_id: value.law_article_id },
            ...value.additional_articles,
          ]);
        },
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
        key: "violation-type",
        title: t("violator-type"),
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
      {
        title: t("deadline"),
        dataIndex: "status_duration_time",
        render: (value: number, record) => {
          const diff = Math.round(value - record.status_update_time);
          const hasPassed = diff < 0;
          const dateObj = secondsToDate(Math.abs(diff));
          const days = dateObj.days ?? 1;

          return (
            <Tag
              bordered={false}
              color={getColor(hasPassed ? -days : days)}
              className="p-1 w-full text-center"
            >
              {displayDeadline(dateObj, hasPassed)}
            </Tag>
          );
        },
      },
    ];

    if (searchParams.get("status") === "created") {
      return allColumns.filter((col) => col.key !== "violation-type");
    }

    return allColumns;
  }, [violationTypes, searchParams, articles, t]);

  useEffect(() => {
    setSearchParams({ ...searchParams.parse(), search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, setSearchParams]);

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
    searchParams,
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
