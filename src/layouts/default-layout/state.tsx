import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext, useLangContext } from "@/contexts";
import { compose, split, tail, take } from "ramda";
import { App, Layout, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { colors } from "@/config/theme";
import settings from "@/config/settings";
import clsx from "clsx";
import ruIcon from "@/assets/RU.svg";
import uzIcon from "@/assets/UZ.png";
import type { ThemeConfig, MenuProps, SiderProps } from "antd";
import type { ItemType } from "antd/es/menu/hooks/useItems";
import type { TFunction } from "i18next";
import type { AppLang, CustomRoute, User } from "@/types";

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
  menuKeys: string[];
  languageOptions: Array<{
    value: string;
    label: JSX.Element;
  }>;
  siderProps: SiderProps;
  defaultLanguage: AppLang;
  user: User;
  handleLanguageChange: (value: AppLang) => void;
  onToggleSider: () => void;
  showDeleteConfirm: () => void;
  t: TFunction;
}

export default function useDefaultLayoutState(
  sidebarRoutes: CustomRoute[],
): DefaultLayoutState {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const { modal } = App.useApp();
  const { t } = useTranslation();
  const { setUser } = useAuthContext();
  const { changeLang } = useLangContext();

  const handleLanguageChange = changeLang;

  const logout = (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser({
      isAuth: false,
      first_name: "",
      last_name: "",
      middle_name: "",
      is_superuser: false,
    });
  };

  const showDeleteConfirm = (): void => {
    modal.confirm({
      title: t("sure-quit"),
      icon: <ExclamationCircleFilled />,
      okButtonProps: { className: "text-[#40916C]" },
      okText: t("yes"),
      cancelText: t("no"),
      onOk() {
        setTimeout(logout, 500);
      },
    });
  };

  const onToggleSider = (): void => {
    setCollapsed(!collapsed);
  };

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
            {typeof Icon !== "undefined" && Icon !== null ? <Icon /> : null}
            {collapsed ? "" : t(title ?? "")}
          </span>
        ),
        title: t(title as string) ?? "",
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

  const defaultLanguage = (localStorage.getItem("i18nextLng") ??
    settings.defaultLanguage) as AppLang;

  const menuKeys = getTopRoute(pathname);

  return {
    Sider,
    Text,
    theme,
    collapsed,
    menuKeys,
    items,
    languageOptions,
    siderProps,
    defaultLanguage,
    user,
    handleLanguageChange,
    onToggleSider,
    showDeleteConfirm,
    t,
  };
}
