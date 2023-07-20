import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compose, split, tail, take } from "ramda";
import { Layout, Typography } from "antd";
import { colors } from "@/config/theme";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import ruIcon from "@/assets/RU.svg";
import uzIcon from "@/assets/UZ.png";
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
type getTopRouteFn = (str: string) => string[];
// getTopRoute :: string -> [string] -> [string] -> [string]
const getTopRoute = compose(take(1), tail, split("/")) as getTopRouteFn;

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
  handleLanguageChange: (value: string) => void;
  onToggleSider: () => void;
}

export default function useDefaultLayoutState(
  sidebarRoutes: CustomRoute[],
): DefaultLayoutState {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string): void => {
    void i18n.changeLanguage(value);
  };

  const onToggleSider = (): void => {
    setCollapsed(!collapsed);
  };

  const defaultMenuItemKeys = getTopRoute(pathname);

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
            {collapsed ? "" : t(title ?? "")}
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
    [sidebarRoutes, collapsed, navigate, t],
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
        value: "uzCryllic",
        label: (
          <span className="flex items-center gap-2">
            <img src={uzIcon} alt="uz cryllic" width={28} height={20} />{" "}
            {collapsed ? "" : "Узбекча"}
          </span>
        ),
      },
      {
        value: "uzLatin",
        label: (
          <span className="flex items-center gap-2">
            <img src={uzIcon} alt="uz latin" width={28} height={20} />{" "}
            {collapsed ? "" : "O'zbekcha"}
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
    handleLanguageChange,
    onToggleSider,
  };
}
