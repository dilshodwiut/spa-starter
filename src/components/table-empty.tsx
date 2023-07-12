import { Empty } from "antd";
import EmptyIcon from "@/assets/note.svg";

interface Props {
  title: string;
  description: string;
}

export default function TableEmpty(props: Props): React.ReactElement {
  const { title, description } = props;

  return (
    <Empty
      style={{ height: "calc(110vh - 370px)" }}
      className="flex flex-col justify-center items-center"
      image={
        <div className="h-24 w-24 bg-[#fafbfc] rounded-3xl m-auto">
          <img
            src={EmptyIcon}
            alt="no data"
            width={48}
            height={48}
            className="m-auto"
          />
        </div>
      }
      description={
        <div className="w-96 m-auto">
          <span className="font-medium text-base">{title}</span>
          <p className="text-sm text-[#62738C]">{description}</p>
        </div>
      }
    />
  );
}
