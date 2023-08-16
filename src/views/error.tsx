import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Result } from "antd";

export default function Error(): React.ReactElement {
  const navigate = useNavigate();
  const error = useRouteError();

  const { t } = useTranslation();

  console.error("isRouterError: ", isRouteErrorResponse(error));
  console.error(error);

  return (
    <Result
      status="error"
      title={t("page-load-error")}
      subTitle={t("report-to-me")}
      extra={[
        <Button
          type="primary"
          key="console"
          className="bg-[#40916C]"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("go-home")}
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            window.location.reload();
          }}
        >
          {t("refresh")}
        </Button>,
      ]}
    />
  );
}
