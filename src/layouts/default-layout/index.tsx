import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { colors } from "@/config/theme";
import type { CustomRoute } from "@/types";
import useDefaultLayoutState from "./state";

interface Props {
  children: React.ReactElement;
  sidebarRoutes: CustomRoute[];
}

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children, sidebarRoutes } = props;

  const { defaultLanguage, handleLanguageChange } =
    useDefaultLayoutState(sidebarRoutes);

  const { t } = useTranslation();

  return (
    <div className="">
      Layout
      {children}
    </div>
  );
}
