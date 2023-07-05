import { Layout, Menu, Button, Select, ConfigProvider } from "antd";
import { colors } from "@/config/theme";
import brandLogo from "@/assets/enjin-coin-(enj).svg";
import downIcon from "@/assets/arrow-down.svg";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import type { CustomRoute } from "@/types";
import useDefaultLayoutState from "./state";

interface Props {
  children: React.ReactElement;
  sidebarRoutes: CustomRoute[];
}

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children, sidebarRoutes } = props;

  const {
    Sider,
    Text,
    theme,
    collapsed,
    pathname,
    items,
    handleChange,
    languageOptions,
    onToggleSider,
  } = useDefaultLayoutState(sidebarRoutes);

  return (
    <Layout hasSider>
      {/* Placeholder Sider */}
      <Sider
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          background: colors.bg_grey,
          height: "100vh",
        }}
      />
      <Sider
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          background: colors.bg_grey,
          // overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="flex flex-col gap-6 h-full">
          <span
            className="ms-1 me-1 pl-6 pr-4 flex items-center h-10 leading-10 py-0 border-none relative"
            style={{
              marginBlock: "4px",
              paddingInline: collapsed ? "calc(50% - 8px - 4px)" : "",
              width: "calc(100% - 8px)",
            }}
            tabIndex={-1}
          >
            <img src={brandLogo} alt="brand logo" />
            <Text
              strong
              className="ms-2.5 overflow-hidden whitespace-nowrap flex-auto text-left transition-opacity duration-300 ease-in"
              style={{
                opacity: collapsed ? 0 : 1,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              E-Dalolatnoma
            </Text>

            <Button
              type="text"
              onClick={onToggleSider}
              className="absolute p-2 h-9 -right-6 bg-[#fafbfc] border-white border-2 rounded-full"
            >
              <img
                src={arrowLeftIcon}
                alt="arrow left"
                style={{ rotate: collapsed ? "180deg" : "0deg" }}
              />
            </Button>
          </span>

          <ConfigProvider theme={theme}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              items={items}
              style={{ borderRightWidth: 0 }}
              className="flex-grow px-2 bg-[#fafbfc]"
            />
          </ConfigProvider>

          <div className="m-1 px-2 pb-2">
            <Select
              defaultValue="ru"
              className="w-full"
              size="large"
              onChange={handleChange}
              options={languageOptions}
              suffixIcon={
                collapsed ? null : <img src={downIcon} alt="arrow down" />
              }
              style={{
                fontSize: "15px",
                lineHeight: "18px", // TODO: fix select height and font size
              }}
            />
          </div>
        </div>
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
}
