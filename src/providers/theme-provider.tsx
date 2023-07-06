import { ConfigProvider } from "antd";
import { colors } from "@/config/theme";
import CustomEmpty from "@/components/empty";

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

  return (
    <ConfigProvider theme={theme} renderEmpty={CustomEmpty}>
      {children}
    </ConfigProvider>
  );
}
