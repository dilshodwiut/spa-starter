import { Table, Input, Button, Space, Pagination, ConfigProvider } from "antd";
import TableEmpty from "@/components/table-empty";
import SearchIcon from "@/assets/search-normal.svg";
import AddIcon from "../components/add-icon";
import useInspectorsState from "./inspectors.state";

export default function Inspectors(): React.ReactElement {
  const {
    Header,
    Content,
    data,
    columns,
    colorBgContainer,
    paginationProps,
    onPageChange,
    onTableRow,
    onAddClick,
  } = useInspectorsState();

  return (
    <ConfigProvider
      renderEmpty={() => (
        <TableEmpty
          title="Inspectors list is empty"
          description="This will display a list of all inspectors in the recent past."
        />
      )}
    >
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <h1 className="font-semibold text-xl">Inspectors List</h1>

        <Space size="large">
          <Input
            size="large"
            placeholder="Search by full name"
            suffix={<img src={SearchIcon} alt="search" />}
          />

          <Button
            className="bg-[#d8f3dc] border-none font-bold flex items-center p-6 gap-1 rounded-xl"
            icon={<AddIcon className="text-[#40916c]" />}
            onClick={onAddClick}
          >
            Add inspector
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
          onRow={onTableRow}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          onChange={onPageChange}
          pagination={paginationProps}
          rowClassName="cursor-pointer"
        />
        {data.length === 0 ? (
          <>
            <br />
            <Pagination className="text-right" {...paginationProps} />
          </>
        ) : null}
      </Content>
    </ConfigProvider>
  );
}
