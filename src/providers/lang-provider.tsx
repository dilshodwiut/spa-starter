import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { langContext } from "@/contexts/lang-context";
import settings from "@/config/settings";
import "@/utils/i18n";
import "@/lib/to-capital-case";
import "@/lib/parse";
import type { AppLang } from "@/types";

interface Props {
  children: React.ReactElement;
}

const initialLang = (localStorage.getItem("i18nextLng") ??
  settings.defaultLanguage) as AppLang;

export default function LangProvider(props: Props): React.ReactElement {
  const { children } = props;

  const { i18n } = useTranslation();

  const [lang, setLang] = useState<AppLang>(initialLang);

  const value = useMemo(
    () => ({
      lang,
      changeLang: (lng: AppLang) => {
        void i18n.changeLanguage(lng);
        setLang(lng);
      },
    }),
    [lang, i18n],
  );

  return <langContext.Provider value={value}>{children}</langContext.Provider>;
}
