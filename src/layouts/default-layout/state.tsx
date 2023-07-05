import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography } from "antd";
import { colors } from "@/config/theme";
import ruIcon from "@/assets/RU.svg";
import type { ThemeConfig, MenuProps } from "antd";
import type { CustomRoute } from "@/types";
import type { ItemType } from "antd/es/menu/hooks/useItems";

const { Sider } = Layout;
const { Text } = Typography;

const theme = {
  token: {
    colorText: colors.grey,
  },
};

interface DefaultLayoutState {
  Sider: typeof Sider;
  Text: typeof Text;
  theme: ThemeConfig;
  items?: ItemType[];
  collapsed: boolean;
  pathname: string;
  languageOptions: Array<{
    value: string;
    label: JSX.Element;
  }>;
  handleChange: (value: string) => void;
  onToggleSider: () => void;
}

export default function useDefaultLayoutState(
  sidebarRoutes: CustomRoute[],
): DefaultLayoutState {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (value: string): void => {
    console.log(`selected ${value}`);
  };

  const onToggleSider = (): void => {
    setCollapsed(!collapsed);
  };

  const items = useMemo(
    (): MenuProps["items"] =>
      sidebarRoutes.map(({ path, title, Icon }) => ({
        key: path as string,
        icon: typeof Icon === "function" ? <Icon /> : null,
        label: title,
        title,
        onClick: () => {
          navigate(path as string);
        },
        style: {
          height: "50px",
          borderRadius: "10px",
          fontSize: "15px",
          lineHeight: "18px",
        },
      })),
    [sidebarRoutes, navigate],
  );

  const languageOptions = useMemo(
    () => [
      {
        value: "ru",
        label: (
          <span className="flex items-center gap-2">
            <img src={ruIcon} alt="russian" /> {collapsed ? "" : "Русский"}
          </span>
        ),
      },
      {
        value: "en",
        label: (
          <span className="flex items-center gap-2">
            <img src={ruIcon} alt="english" /> {collapsed ? "" : "English"}
          </span>
        ),
      },
    ],
    [collapsed],
  );

  return {
    Sider,
    Text,
    theme,
    collapsed,
    pathname,
    items,
    handleChange,
    languageOptions,
    onToggleSider,
  };
}
