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
  Checkbox,
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
    columns,
    colorBgContainer,
    paginationProps,
    typeOptions,
    isDrawerOpen,
    showDrawer,
    closeDrawer,
    handleChange,
    onPageChange,
    onDrawerClose,
    onDateChange,
    onTypeChange,
    onTableRow,
    t,
  } = useActsState();

  return (
    <ConfigProvider
      renderEmpty={() => (
        <TableEmpty
          title={t("act-list-empty")}
          description={t("act-list-empty-info")}
        />
      )}
    >
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <div>
          <Segmented
            size="large"
            options={[
              t("processed") ?? "",
              t("non-processed") ?? "",
              t("cancelled") ?? "",
              t("overdued") ?? "",
            ]}
            className="text-[#62738C]"
          />
        </div>

        <Space size="large">
          <Input
            size="large"
            placeholder={t("search-by-serial-number") ?? ""}
            suffix={<img src={SearchIcon} alt="search" />}
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
            initialValues={{ type: "regional_electrical_networks" }}
          >
            <Form.Item name="type" label={t("type")}>
              <Checkbox.Group options={typeOptions} onChange={onTypeChange} />
            </Form.Item>

            <Form.Item name="violation_date" label={t("violation-date")}>
              <DatePicker
                className="w-full"
                size="large"
                placeholder={t("select-date") ?? ""}
                onChange={onDateChange}
              />
            </Form.Item>

            <Form.Item name="region" label={t("region")}>
              <Select
                placeholder={t("choose-from-list")}
                className="w-full"
                size="large"
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>

            <Form.Item name="district" label={t("district")}>
              <Select
                placeholder={t("choose-from-list")}
                className="w-full"
                size="large"
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="infringement_article"
              label={t("infringement-article")}
            >
              <Select
                placeholder={t("choose-from-list")}
                className="w-full"
                size="large"
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>

            <Form.Item name="offender_type" label={t("offender-type")}>
              <Select
                id="sdf"
                placeholder={t("choose-from-list")}
                className="w-full"
                size="large"
                onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button
                icon={<FilterIcon />}
                type="primary"
                className="flex justify-center items-center bg-[#40916c] text-white w-full h-10 rounded-xl"
              >
                {t("apply")}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Content>
    </ConfigProvider>
  );
}
