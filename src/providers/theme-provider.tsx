import { useEffect, useState } from "react";
import { useLangContext } from "@/contexts";
import { colors } from "@/config/theme";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import type { Locale } from "antd/es/locale";

interface Props {
  children: React.ReactElement;
}

const theme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryBg: colors.bg_primary,
    colorTextPlaceholder: colors.placeholder,
    colorBorder: colors.border,
    // borderRadius: 12,
    // borderRadiusLG: 20,
  },
};

export default function ThemeProvider(props: Props): React.ReactElement {
  const { children } = props;

  const { lang } = useLangContext();

  const [locale, setLocale] = useState<Locale>();

  useEffect(() => {
    import("antd/locale/ru_RU")
      .then((module) => {
        setLocale(module.default);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (lang === "ru") {
      import("dayjs/locale/ru");
    }

    if (lang === "uzCryllic") {
      import("dayjs/locale/uz");
    }

    if (lang === "uzLatin") {
      import("dayjs/locale/uz-latn");
    }
  }, [lang]);

  return (
    <ConfigProvider theme={theme} locale={locale}>
      {children}
    </ConfigProvider>
  );
}
