import { ConfigProvider } from "antd";
import { colors } from "@/config/theme";

interface Props {
  children: React.ReactElement;
}

const theme = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryBg: colors.bg_primary,
  },
};

export default function ThemeProvider(props: Props): React.ReactElement {
  const { children } = props;

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
