import clsx from "clsx";
import type { InfoProps } from "../types";

export default function Info(props: InfoProps): React.ReactElement {
  const {
    of,
    value,
    className,
    rootClassName,
    ofClassName,
    valueClassName,
    children,
  } = props;

  return (
    <div className={clsx("flex flex-col gap-1 font-medium", rootClassName)}>
      <span className={clsx("text-[#62738C] text-sm", ofClassName)}>{of}</span>
      <span
        className={clsx("", valueClassName !== "" ? valueClassName : className)}
      >
        {value !== "" ? value : children}
      </span>
    </div>
  );
}

Info.defaultProps = {
  value: "",
  className: "",
  rootClassName: "",
  ofClassName: "",
  valueClassName: "",
  children: null,
};
