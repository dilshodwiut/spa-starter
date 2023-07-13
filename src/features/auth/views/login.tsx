import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout } from "antd";
import brandLogo from "@/assets/enjin-coin-(enj).svg";
import { login } from "../api";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      // navigate(`/products/repricing/${res.id}`);
      console.log(res);
    },
    onError: (error) => {
      console.error(error);
      // addToast({ title: error.data.error });
    },
  });

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
          onFinish={mutate}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="font-medium text-sm text-[#62738C]">Login</span>
            }
            name="username"
            className="mb-6"
            rules={[
              {
                required: true,
                min: 1,
                message: "Username cannot be less than 1 character",
              },
            ]}
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
            rules={[
              {
                required: true,
                min: 1,
                message: "Password cannot be less than 1 character",
              },
            ]}
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
              className="w-full bg-[#40916C] rounded-xl h-12 font-medium text-[15px]"
            >
              Submit
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
