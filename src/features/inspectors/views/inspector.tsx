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
    goBack,
    isModalOpen,
    handleCancel,
  } = useInspectorState();

  return (
    <>
      <Header
        style={{ background: colorBgContainer }}
        className="px-8 flex items-center gap-4"
      >
        <button type="button" onClick={goBack}>
          <img src={backIcon} alt="back" width={24} height={24} />
        </button>

        <h1 className="font-semibold text-xl">Adding a new inspector</h1>
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
          initialValues={{}}
          onFinish={() => {
            //
          }}
          onFinishFailed={() => {
            //
          }}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Last name"
                name="last_name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Passport" name="passport">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Phone number" name="phone">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Organization" name="organization">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Region" name="region">
                <Select size="large" />
              </Form.Item>
              <Form.Item label="Login" name="login">
                <Input size="large" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="First name"
                name="first_name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label="PINFL" name="pinfl">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="City phone number" name="city_phone">
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Organization division"
                name="organization_divison"
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label="District" name="district">
                <Select size="large" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password
                  placeholder="Password"
                  className="h-12 rounded-xl"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Patronymic"
                name="patronymic"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Date of birth" name="dob">
                <DatePicker size="large" className="w-full" />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Job title" name="job_title">
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
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-200 text-black font-medium text-[18px] h-14"
              >
                Create user
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
              Close
            </Button>
          }
        />
      </CustomModal>
    </>
  );
}
