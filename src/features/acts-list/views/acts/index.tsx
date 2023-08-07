import {
  Segmented,
  Table,
  Input,
  Button,
  Space,
  Pagination,
  Drawer,
  Form,
  Select,
  DatePicker,
  ConfigProvider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TableEmpty from "@/components/table-empty";
import SearchIcon from "@/assets/search-normal.svg";
import SettingsIcon from "../../components/settings-icon";
import FilterIcon from "../../components/filter-icon";
import useActsState from "./state";

export default function Acts(): React.ReactElement {
  const {
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
  } = useActsState();

  return (
    <>
      {contextHolder}
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <div>
          <Segmented
            size="large"
            options={[
              { label: t("non-processed"), value: "created" },
              { label: t("processed"), value: "defined" },
              { label: t("sent"), value: "sent" },
              { label: t("cancelled"), value: "rejected" },
              { label: t("overdued"), value: "performed" },
            ]}
            className="text-[#62738C]"
            onChange={onSegmentChange}
            value={searchParams.get("status") ?? "created"}
          />
        </div>

        <Space size="large">
          <Input
            size="large"
            placeholder={t("search-by-serial-number") ?? ""}
            suffix={<img src={SearchIcon} alt="search" />}
            onChange={onSearchChange}
            defaultValue={searchParams.get("search") ?? ""}
          />

          <Button
            className="bg-[#d8f3dc] border-none font-bold flex items-center p-6 gap-1 rounded-xl"
            icon={<SettingsIcon className="text-[#40916c]" />}
            onClick={showDrawer}
          >
            {t("filter")}
          </Button>
        </Space>
      </Header>

      <ConfigProvider
        renderEmpty={() => (
          <TableEmpty
            title={t("act-list-empty")}
            description={t("act-list-empty-info")}
          />
        )}
      >
        <Content
          className="p-8"
          style={{
            overflow: "initial",
            background: colorBgContainer,
          }}
        >
          <Table
            loading={isTableLoading}
            onRow={onTableRow}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data?.results}
            onChange={onPageChange}
            pagination={paginationProps}
            rowClassName="cursor-pointer"
            locale={{
              triggerDesc: t("sort_descending") ?? "",
              triggerAsc: t("sort_ascending") ?? "",
              cancelSort: t("sort_cancel") ?? "",
            }}
          />
          {data?.count === 0 ? (
            <>
              <br />
              <Pagination className="text-right" {...paginationProps} />
            </>
          ) : null}
        </Content>
      </ConfigProvider>
      <Drawer
        title={t("filter")}
        placement="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        closeIcon={null}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ color: "black" }}
            className="bg-[#8498B41A] text-black border-none"
            onClick={onDrawerClose}
          >
            {t("close")}
          </Button>
        }
      >
        <Form
          name="filter"
          layout="vertical"
          form={form}
          onFinish={onFiltersApply}
          initialValues={{ doc_type: [], violation_date: null }}
        >
          <Form.Item name="doc_type" label={t("doc-type")}>
            <Select
              placeholder={t("choose-from-list")}
              className="w-full"
              size="large"
              mode="multiple"
              options={docs}
              allowClear
            />
          </Form.Item>

          <Form.Item name="violation_date" label={t("violation-date")}>
            <DatePicker.RangePicker
              className="w-full"
              size="large"
              placeholder={[t("from"), t("to")]}
            />
          </Form.Item>

          <Form.Item name="region" label={t("region")}>
            <Select
              placeholder={t("choose-from-list")}
              className="w-full"
              size="large"
              onChange={handleRegionChange}
              options={regions}
              allowClear
            />
          </Form.Item>

          {typeof selectedRegion !== "undefined" && (
            <Form.Item name="district" label={t("district")}>
              <Select
                placeholder={t("choose-from-list")}
                className="w-full"
                size="large"
                options={districts}
                allowClear
              />
            </Form.Item>
          )}

          <Form.Item
            name="infringement_article"
            label={t("infringement-article")}
          >
            <Select
              placeholder={t("choose-from-list")}
              className="w-full"
              size="large"
              options={articles}
              allowClear
            />
          </Form.Item>

          <Form.Item name="violation_type" label={t("offender-type")}>
            <Select
              id="sdf"
              placeholder={t("choose-from-list")}
              className="w-full"
              size="large"
              options={violationTypes}
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button
              icon={<FilterIcon />}
              type="primary"
              htmlType="submit"
              className="flex justify-center items-center bg-[#40916c] text-white w-full h-10 rounded-xl"
            >
              {t("apply")}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
