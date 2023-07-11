import clsx from "clsx";
import { Card } from "antd";
import type { CustomCardProps } from "../types";

export default function CustomCard(props: CustomCardProps): React.ReactElement {
  const { children, className, title } = props;

  return (
    <Card
      title={title}
      className={clsx("bg-[#fafbfc] border border-[#f5f5f5]", className)}
    >
      {children}
    </Card>
  );
}

CustomCard.defaultProps = {
  className: "",
};
