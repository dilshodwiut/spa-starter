import { Button, Form, Input, Layout } from "antd";
import brandLogo from "@/assets/enjin-coin-(enj).svg";

export default function Login(): React.ReactElement {
  return (
    <Layout style={{ background: "#fafbfc" }}>
      <main className="flex flex-col justify-center items-center gap-5 h-screen w-[360px] text-center m-auto">
        <header className="flex flex-col items-center gap-2">
          <img src={brandLogo} width={48} height={48} alt="brand logo" />
          <h1 className="font-semibold text-[28px]">E-Dalolatnoma</h1>
        </header>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-lg">Welcome</h2>
          <p className="text-[#8498B4] text-[15px]">
            Enter your username and password to login and get started
          </p>
        </div>

        <Form
          name="login-form"
          layout="vertical"
          className="w-full"
          onFinish={() => {
            //
          }}
          onFinishFailed={() => {
            //
          }}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="font-medium text-sm text-[#62738C]">Login</span>
            }
            name="login"
            className="mb-6"
          >
            <Input placeholder="Login" className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-sm text-[#62738C]">
                Password
              </span>
            }
            name="password"
            className="mb-6"
          >
            <Input.Password
              placeholder="Password"
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#40916C] rounded-xl h-12"
            >
              <span className="font-medium text-[15px]">Submit</span>
            </Button>
          </Form.Item>
        </Form>
      </main>

      <p className="absolute bottom-6 ml-[50%] -translate-x-1/2 text-[#8498B4]">
        © 2023 E-Dalolatnoma. Version 0.1
      </p>
    </Layout>
  );
}
