import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/contexts";
import { Button, Form, Input, Layout, message } from "antd";
import brandLogo from "@/assets/enjin-coin-(enj).svg";
import { login } from "../api";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("access_token", res.access);
      localStorage.setItem(
        "user",
        JSON.stringify({
          first_name: res.user.first_name ?? "",
          last_name: res.user.last_name ?? "",
          middle_name: res.user.middle_name ?? "",
        }),
      );
      setUser({
        isAuth: true,
        first_name: res.user.first_name ?? "",
        last_name: res.user.last_name ?? "",
        middle_name: res.user.middle_name ?? "",
      });
      navigate("/");
    },
    onError: (error: { data: { detail: string } }) => {
      void messageApi.error({
        content: error.data.detail,
      });
    },
  });

  return (
    <Layout style={{ background: "#fafbfc" }}>
      {contextHolder}
      <main className="flex flex-col justify-center items-center gap-5 h-screen w-[360px] m-auto">
        <header className="flex flex-col items-center gap-2">
          <img src={brandLogo} width={48} height={48} alt="brand logo" />
          <h1 className="font-semibold text-[28px]">E-Dalolatnoma</h1>
        </header>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-bold text-lg">{t("welcome")}</h2>
          <p className="text-[#8498B4] text-[15px]">{t("welcome-info")}</p>
        </div>

        <Form
          name="login-form"
          layout="vertical"
          className="w-full"
          onFinish={mutate}
          autoComplete="off"
          requiredMark="optional"
        >
          <Form.Item
            label={
              <span className="font-medium text-sm text-[#62738C]">
                {t("login")}
              </span>
            }
            name="username"
            className="mb-10"
            rules={[
              {
                required: true,
                type: "string",
                min: 1,
                whitespace: true,
                message: t("username-min-3") ?? "",
              },
            ]}
          >
            <Input placeholder={t("login") ?? ""} className="h-12 rounded-xl" />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-sm text-[#62738C]">
                {t("password")}
              </span>
            }
            name="password"
            className="mb-10"
            rules={[
              {
                required: true,
                type: "string",
                min: 1,
                whitespace: true,
                message: t("password-min-6") ?? "",
              },
            ]}
          >
            <Input.Password
              placeholder={t("password") ?? ""}
              className="h-12 rounded-xl"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#40916C] rounded-xl h-12 font-medium text-[15px]"
              loading={isLoading}
            >
              {t("signin")}
            </Button>
          </Form.Item>
        </Form>
      </main>

      <p className="absolute bottom-6 ml-[50%] -translate-x-1/2 text-[#8498B4]">
        {t("login-footer")}
      </p>
    </Layout>
  );
}
