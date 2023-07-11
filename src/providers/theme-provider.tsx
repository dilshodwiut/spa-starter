import { ConfigProvider } from "antd";
import { colors } from "@/config/theme";
import type { ThemeConfig } from "antd";

interface Props {
  children: React.ReactElement;
}

const theme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryBg: colors.bg_primary,
    // borderRadiusLG: 20,
  },
};

export default function ThemeProvider(props: Props): React.ReactElement {
  const { children } = props;

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
