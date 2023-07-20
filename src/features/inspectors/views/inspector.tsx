import { Button, Col, DatePicker, Result, Row, Select } from "antd";
import CustomModal from "@/components/modal";
import backIcon from "@/assets/arrow-left.svg";
import tickIcon from "@/assets/tick-square.svg";
import useInspectorState from "./inspector.state";

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
    contextHolder,
    goBack,
    handleCancel,
    submitHandler,
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
          // initialValues={initialValues}
          onFinish={submitHandler}
          autoComplete="off"
          form={form}
        >
          <Row gutter={48}>
            <Col span={8}>
              <Form.Item
                label={t("last-name")}
                name="last_name"
                rules={[
                  {
                    required: true,
                    type: "string",
                    min: 1,
                    whitespace: true,
                    message: t("lastname-min-5") ?? "",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("passport")} name="passport_series">
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("phone")} name="phone">
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("organization")} name="organization">
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("region")} name="region">
                <Select size="large" />
              </Form.Item>
              <Form.Item label={t("login")} name="username">
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={t("first-name")}
                name="first_name"
                rules={[
                  {
                    required: true,
                    type: "string",
                    min: 1,
                    whitespace: true,
                    message: t("firstname-min-3") ?? "",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("pinfl")} name="pinfl">
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("city-phone")} name="city_phone">
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label={t("organization-division")}
                name="organization_divison"
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("district")} name="district">
                <Select size="large" />
              </Form.Item>
              <Form.Item label={t("password")} name="password">
                <Input.Password
                  placeholder="Password"
                  className="h-12 rounded-xl"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label={t("patronymic")}
                name="patronymic"
                rules={[
                  {
                    required: true,
                    type: "string",
                    min: 1,
                    whitespace: true,
                    message: t("patronymic-min-5") ?? "",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("dob")} name="birth_date">
                <DatePicker
                  size="large"
                  className="w-full"
                  placeholder={t("select-date") ?? ""}
                />
              </Form.Item>
              <Form.Item label={t("residence-address")} name="address">
                <Input size="large" />
              </Form.Item>
              <Form.Item label={t("job-title")} name="position">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <div className="absolute bottom-6 right-6">
            <div className="flex gap-6">
              <Button
                type="default"
                className="bg-gray-200 text-[#8498B4] font-medium text-[18px] h-14"
                onClick={goBack}
              >
                {t("cancel")}
              </Button>

              <Button
                type="primary"
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
          title="Success!"
          subTitle="New user added to the system"
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
