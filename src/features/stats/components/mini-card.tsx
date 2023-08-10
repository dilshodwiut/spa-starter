import { Card, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

interface Props {
  text: string;
  count: number;
  trend: number;
}

export default function MiniCard(props: Props): React.ReactElement {
  const { text, count, trend } = props;

  const increasing = trend > 0;

  return (
    <Card title={null} className="bg-[#fafbfc] border border-[#f5f5f5]">
      <div className="text-[#62738C]">{text}</div>
      <br />
      <div className="flex gap-4">
        <span className="font-bold text-xl">
          <CountUp end={count} separator=" " />
        </span>
        <Tag
          bordered={false}
          color={increasing ? "success" : "error"}
          className="flex items-center gap-2"
        >
          {Math.abs(trend)}%{" "}
          <ArrowRightOutlined
            style={{ rotate: increasing ? "-45deg" : "45deg" }}
          />
        </Tag>
      </div>
    </Card>
  );
}
