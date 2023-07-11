import clsx from "clsx";
import { useEventListener } from "usehooks-ts";
import { Tag } from "antd";
import type { ActionBoxIconPlaceholder, ActionBoxProps } from "../types";

const colorMap = {
  blue: ["#cedaf5", "#3266d5"],
  green: ["#d8f3dc", "#40916c"],
  grey: ["#f5f5f5", "#8498b4"],
  red: ["#fed4d4", "#fb4a4a"],
} as const;

export default function ActionBox(props: ActionBoxProps): React.ReactElement {
  const {
    children,
    color,
    className,
    actionKey,
    Icon,
    iconPosition,
    onDispatchAction,
  } = props;

  useEventListener("keydown", (e) => {
    if (e.key === actionKey) {
      e.preventDefault();
      onDispatchAction();
    }
  });

  const icon: ActionBoxIconPlaceholder = {
    left: null,
    right: null,
  };

  if (Icon !== undefined && iconPosition !== undefined) {
    icon[iconPosition] = <Icon style={{ color: colorMap[color][1] }} />;
  }

  return (
    <div
      className={clsx(
        "p-4 rounded-xl flex items-center justify-between",
        className,
      )}
      style={{ background: colorMap[color][0] }}
    >
      <span className="flex items-center gap-2">
        {icon.left}
        {children}
      </span>

      <span className="flex items-center gap-2">
        <Tag className="bg-[#fafbfc] text-[#62738C]">{actionKey}</Tag>
        {icon.right}
      </span>
    </div>
  );
}

ActionBox.defaultProps = {
  className: "",
  Icon: undefined,
  iconPosition: "left",
};
