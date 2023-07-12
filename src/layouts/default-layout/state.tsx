import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compose, split, tail, take } from "ramda";
import { Layout, Typography } from "antd";
import { colors } from "@/config/theme";
import clsx from "clsx";
import ruIcon from "@/assets/RU.svg";
import type { ThemeConfig, MenuProps, SiderProps } from "antd";
import type { CustomRoute } from "@/types";
import type { ItemType } from "antd/es/menu/hooks/useItems";

const { Sider } = Layout;
const { Text } = Typography;

const theme = {
  token: {
    colorText: colors.grey,
  },
};

// "/list-of-acts/9382" -> ["list-of-acts"]
type getTopParentRouteFn = (str: string) => string[];
const getTopParentRoute = compose(
  take(1),
  tail,
  split("/"),
) as getTopParentRouteFn;

interface DefaultLayoutState {
  Sider: typeof Sider;
  Text: typeof Text;
  theme: ThemeConfig;
  items?: ItemType[];
  collapsed: boolean;
  defaultMenuItemKeys: string[];
  languageOptions: Array<{
    value: string;
    label: JSX.Element;
  }>;
  siderProps: SiderProps;
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

  const defaultMenuItemKeys = getTopParentRoute(pathname);

  const items = useMemo(
    // eslint-disable-next-line arrow-body-style
    (): MenuProps["items"] => {
      return sidebarRoutes.map(({ path, title, Icon }) => ({
        key: path as string,
        label: (
          <span
            className={clsx(
              "flex items-center h-full gap-6",
              collapsed ? "-ml-1" : "",
            )}
          >
            {typeof Icon === "function" ? <Icon /> : null}
            {collapsed ? "" : title}
          </span>
        ),
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
      }));
    },
    [sidebarRoutes, collapsed, navigate],
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

  const siderProps: SiderProps = {
    width: 250,
    trigger: null,
    collapsible: true,
    collapsed,
    theme: "light",
  };

  return {
    Sider,
    Text,
    theme,
    collapsed,
    defaultMenuItemKeys,
    items,
    languageOptions,
    siderProps,
    handleChange,
    onToggleSider,
  };
}
