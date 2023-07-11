import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

export default function Error(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title="Error Loading the Page"
      subTitle="Please report this issue to Dilshod."
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            navigate("/");
          }}
        >
          Go home
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </Button>,
      ]}
    />
  );
}
