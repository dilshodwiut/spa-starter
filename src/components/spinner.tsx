import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export default function Spinner(): React.ReactElement {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spin indicator={antIcon} />
    </div>
  );
}
