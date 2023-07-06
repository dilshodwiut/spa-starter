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
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import SearchIcon from "@/assets/search-normal.svg";
import SettingsIcon from "../components/settings-icon";
import FilterIcon from "../components/filter-icon";
import useActsListState from "./state";

export default function ActsList(): React.ReactElement {
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
    handleChange,
    onPageChange,
    onDrawerClose,
    onDateChange,
    onTypeChange,
  } = useActsListState();

  return (
    <>
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 flex justify-between"
      >
        <div>
          <Segmented
            size="large"
            options={["Processed", "Non-processed", "Cancelled", "Overdued"]}
            className="text-[#62738C]"
          />
        </div>

        <Space>
          <Input
            size="large"
            placeholder="Search with serial number"
            suffix={<img src={SearchIcon} alt="search" />}
          />

          <Button
            className="bg-[#d8f3dc] border-none font-bold flex items-center p-6 gap-1 rounded-xl"
            icon={<SettingsIcon className="text-[#40916c]" />}
            onClick={showDrawer}
          >
            Filter
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
          columns={columns}
          dataSource={data}
          onChange={onPageChange}
          pagination={paginationProps}
        />
        {data.length === 0 ? (
          <>
            <br />
            <Pagination className="text-right" {...paginationProps} />
          </>
        ) : null}

        <Drawer
          title="Filter"
          placement="right"
          open={isDrawerOpen}
          closeIcon={null}
          extra={
            <Button
              icon={<CloseOutlined />}
              style={{ color: "black" }}
              className="bg-[#8498B41A] text-black border-none"
              onClick={onDrawerClose}
            >
              Close
            </Button>
          }
        >
          <Form
            name="filter"
            layout="vertical"
            initialValues={{ type: "regional_electrical_networks" }}
          >
            <Form.Item name="type" label="Type">
              <Checkbox.Group options={typeOptions} onChange={onTypeChange} />
            </Form.Item>

            <Form.Item name="violation_date" label="Violation date">
              <DatePicker
                className="w-full"
                size="large"
                onChange={onDateChange}
              />
            </Form.Item>

            <Form.Item name="region" label="Region">
              <Select
                placeholder="Choose from the list"
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

            <Form.Item name="area" label="Area">
              <Select
                placeholder="Choose from the list"
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
              label="Article of infringement"
            >
              <Select
                placeholder="Choose from the list"
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

            <Form.Item name="offender_type" label="Offender type">
              <Select
                id="sdf"
                placeholder="Choose from the list"
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
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Content>
    </>
  );
}
