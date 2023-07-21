import { Table, Input, Button, Space, Pagination, ConfigProvider } from "antd";
import TableEmpty from "@/components/table-empty";
import SearchIcon from "@/assets/search-normal.svg";
import AddIcon from "../../components/add-icon";
import useInspectorsState from "./state";

export default function Inspectors(): React.ReactElement {
  const {
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
    t,
  } = useInspectorsState();

  return (
    <ConfigProvider
      renderEmpty={() => (
        <TableEmpty
          title={t("inspectors-list-empty")}
          description={t("inspectors-list-empty-info")}
        />
      )}
    >
      {contextHolder}
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <h1 className="font-semibold text-xl">{t("inspectors-list")}</h1>

        <Space size="large">
          <Input
            size="large"
            placeholder={t("search-by-fullname") ?? ""}
            suffix={<img src={SearchIcon} alt="search" />}
          />

          <Button
            className="bg-[#d8f3dc] border-none font-bold flex items-center p-6 gap-1 rounded-xl"
            icon={<AddIcon className="text-[#40916c]" />}
            onClick={onAddClick}
          >
            {t("add-inspector")}
          </Button>
        </Space>
      </Header>
      <Content
        className="p-8"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data?.results}
          onChange={onPageChange}
          pagination={paginationProps}
          loading={isLoading || isPreviousData || isPlaceholderData}
        />
        {data?.count === 0 ? (
          <>
            <br />
            <Pagination className="text-right" {...paginationProps} />
          </>
        ) : null}
      </Content>
    </ConfigProvider>
  );
}
