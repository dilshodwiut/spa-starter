import { PatternFormat } from "react-number-format";
import { Button, DatePicker, Result, Select } from "antd";
import dayjs from "dayjs";
import CustomModal from "@/components/modal";
import backIcon from "@/assets/arrow-left.svg";
import tickIcon from "@/assets/tick-square.svg";
import useInspectorState from "./state";

export default function Inspector(): React.ReactElement {
  const {
    Header,
    Content,
    Form,
    Input,
    colorBgContainer,
    isModalOpen,
    inspectorId,
    form,
    isLoading,
    regions,
    districts,
    locale,
    contextHolder,
    goBack,
    handleCancel,
    submitHandler,
    handleRegionChange,
    t,
  } = useInspectorState();

  return (
    <>
      {contextHolder}
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex items-center gap-4"
      >
        <button type="button" onClick={goBack}>
          <img src={backIcon} alt="back" width={24} height={24} />
        </button>

        <h1 className="font-semibold text-2xl">
          {typeof inspectorId === "string"
            ? t("updating-inspector")
            : t("adding-inspector")}
        </h1>
      </Header>

      <Content
        className="p-8"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        <Form
          name="create-inspector-form"
          layout="vertical"
          onFinish={submitHandler}
          autoComplete="off"
          form={form}
        >
          <div className="w-full flex gap-4">
            <Form.Item
              label={t("last-name")}
              name="last_name"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                  message: t("lastname-min-5") ?? "",
                },
              ]}
              className="w-1/3"
            >
              <Input size="large" placeholder={t("last-name") ?? ""} />
            </Form.Item>
            <Form.Item
              label={t("first-name")}
              name="first_name"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 3,
                  whitespace: true,
                  message: t("firstname-min-3") ?? "",
                },
              ]}
              className="w-1/3"
            >
              <Input size="large" placeholder={t("first-name") ?? ""} />
            </Form.Item>
            <Form.Item
              label={t("patronymic")}
              name="patronymic"
              rules={[
                {
                  required: false,
                  type: "string",
                  min: 1,
                  whitespace: true,
                  message: t("patronymic-min-5") ?? "",
                },
              ]}
              className="w-1/3"
            >
              <Input size="large" placeholder={t("patronymic") ?? ""} />
            </Form.Item>
          </div>

          <div className="w-full flex gap-4">
            <Form.Item
              label={t("passport")}
              name="passport_series"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" placeholder={t("passport") ?? ""} />
            </Form.Item>
            <Form.Item
              label={t("pinfl")}
              name="pinfl"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" placeholder={t("pinfl") ?? ""} />
            </Form.Item>

            <Form.Item
              label={t("dob")}
              name="birth_date"
              className="w-1/3"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                size="large"
                className="w-full"
                placeholder={t("select-date") ?? ""}
                locale={locale}
                defaultPickerValue={dayjs().year(2000).month(0).date(1)}
                disabledDate={(currDate) =>
                  currDate.add(18, "year").isAfter(Date.now())
                }
              />
            </Form.Item>
          </div>

          <div className="w-full flex gap-4">
            <Form.Item
              label={t("phone")}
              name="phone"
              className="w-1/3"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <PatternFormat
                format="+998 ## ### ## ##"
                customInput={Input}
                size="large"
                placeholder="+998"
              />
            </Form.Item>

            <Form.Item
              label={t("city-phone")}
              name="city_phone"
              className="w-1/3"
            >
              <PatternFormat
                format="+998 ## ### ## ##"
                customInput={Input}
                size="large"
                placeholder="+998"
              />
            </Form.Item>

            <Form.Item
              label={t("residence-address")}
              name="address"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" placeholder={t("residence-address") ?? ""} />
            </Form.Item>
          </div>

          <div className="w-full flex gap-4">
            <Form.Item
              label={t("organization")}
              name="organization"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" placeholder={t("organization") ?? ""} />
            </Form.Item>

            <Form.Item
              label={t("organization-division")}
              name="organization_divison"
              className="w-1/3"
            >
              <Input
                size="large"
                placeholder={t("organization-division") ?? ""}
              />
            </Form.Item>
            <Form.Item
              label={t("job-title")}
              name="position"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 3,
                  whitespace: true,
                },
              ]}
            >
              <Input size="large" placeholder={t("job-title") ?? ""} />
            </Form.Item>
          </div>

          <div className="w-full flex gap-4">
            <Form.Item
              label={t("region")}
              name="region"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 5,
                  whitespace: true,
                },
              ]}
            >
              <Select
                size="large"
                placeholder={t("region") ?? ""}
                onChange={handleRegionChange}
                options={regions}
                allowClear
              />
            </Form.Item>
            <Form.Item label={t("district")} name="district" className="w-1/3">
              <Select
                size="large"
                placeholder={t("district") ?? ""}
                options={districts}
                allowClear
              />
            </Form.Item>
            <div className="w-1/3" />
          </div>

          <div className="w-full flex gap-4">
            <Form.Item
              label={t("login")}
              name="username"
              className="w-1/3"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: 3,
                  whitespace: true,
                  message: t("username-min-3") ?? "",
                },
              ]}
            >
              <Input size="large" placeholder={t("login") ?? ""} />
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              className="w-1/3"
              rules={[
                {
                  required: inspectorId === undefined,
                  type: "string",
                  min: 1,
                  whitespace: true,
                  message: t("password-min-6") ?? "",
                },
              ]}
            >
              <Input.Password
                placeholder={t("password") ?? ""}
                className="h-10 rounded-lg"
              />
            </Form.Item>
            <div className="w-1/3" />
          </div>

          <div className="absolute bottom-6 right-6">
            <div className="flex gap-6">
              <Button
                type="ghost"
                className="bg-gray-200 text-[#8498B4] font-medium text-[18px] h-14"
                onClick={goBack}
              >
                {t("cancel")}
              </Button>

              <Button
                type="ghost"
                htmlType="submit"
                className="bg-green-200 text-black font-medium text-[18px] h-14"
                loading={isLoading}
              >
                {typeof inspectorId === "string"
                  ? t("update-user")
                  : t("create-user")}
              </Button>
            </div>
          </div>
        </Form>
      </Content>

      <CustomModal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Result
          status="success"
          title={t("success")}
          subTitle={t("user-added")}
          icon={
            <div className="h-24 w-24 bg-[#fafbfc] rounded-3xl m-auto flex">
              <img
                src={tickIcon}
                alt="no data"
                width={48}
                height={48}
                className="m-auto"
              />
            </div>
          }
          extra={
            <Button
              onClick={goBack}
              className="bg-[#D8F3DC] text-[#40916C] h-12 w-28 font-medium text-lg"
            >
              {t("close")}
            </Button>
          }
        />
      </CustomModal>
    </>
  );
}
