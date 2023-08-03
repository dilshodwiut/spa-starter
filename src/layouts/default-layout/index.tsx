import {
  Layout,
  Menu,
  Button,
  Select,
  ConfigProvider,
  Popover,
  Modal,
} from "antd";
import {
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@/contexts";
import { colors } from "@/config/theme";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import brandLogo from "@/assets/enjin-coin-(enj).svg";
import downIcon from "@/assets/arrow-down.svg";
import arrowLeftIcon from "@/assets/arrow-left.svg";
import moreIcon from "@/assets/more.svg";
import personIcon from "@/assets/person.svg";
import ruIcon from "@/assets/RU.svg";
import uzIcon from "@/assets/UZ.png";
import type { CustomRoute } from "@/types";
import useDefaultLayoutState from "./state";

const { confirm } = Modal;

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
    menuKeys,
    items,
    languageOptions,
    siderProps,
    defaultLanguage,
    user,
    handleLanguageChange,
    onToggleSider,
  } = useDefaultLayoutState(sidebarRoutes);

  const { t } = useTranslation();

  return (
    <Layout hasSider>
      {/* Placeholder Sider */}
      <Sider
        {...siderProps}
        style={{
          background: colors.bg_grey,
          height: "100vh",
        }}
      />
      <Sider
        {...siderProps}
        style={{
          background: colors.bg_grey,
          height: "100vh",
          // overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="flex flex-col gap-6 h-full">
          <span
            className="ms-1 me-1 pl-6 pr-4 flex items-center h-[50px] leading-10 py-0 border-none relative"
            style={{
              marginBlock: "4px",
              // paddingInline: collapsed ? "calc(50% - 8px - 4px)" : "",
              width: "calc(100% - 8px)",
              marginTop: "28px",
              marginBottom: "0",
            }}
            tabIndex={-1}
          >
            <img src={brandLogo} alt="brand logo" width={30} height={30} />
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
              selectedKeys={menuKeys}
              items={items}
              style={{ borderRightWidth: 0 }}
              className="flex-grow px-2 bg-[#fafbfc]"
            />
          </ConfigProvider>

          <div className="flex flex-col gap-2 px-2 pb-2 mb-2">
            {collapsed ? (
              <Popover
                arrow={false}
                content={
                  <div className="flex flex-col gap-2">
                    <div
                      onClick={() => {
                        handleLanguageChange("ru");
                      }}
                      className="flex justify-center items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5] w-12 h-12 m-auto cursor-pointer hover:shadow-lg transition-shadow"
                      aria-hidden
                    >
                      <img src={ruIcon} alt="russian" />
                    </div>
                    <div
                      onClick={() => {
                        handleLanguageChange("uzCryllic");
                      }}
                      className="flex justify-center items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5] w-12 h-12 m-auto cursor-pointer hover:shadow-lg transition-shadow"
                      aria-hidden
                    >
                      <img src={uzIcon} alt="uz cryllic" />
                    </div>
                    <div
                      onClick={() => {
                        handleLanguageChange("uzLatin");
                      }}
                      className="flex justify-center items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5] w-12 h-12 m-auto cursor-pointer hover:shadow-lg transition-shadow"
                      aria-hidden
                    >
                      <img src={uzIcon} alt="uz latin" />
                    </div>
                  </div>
                }
                title=""
                trigger="click"
              >
                <div className="flex justify-center items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5] w-12 h-12 m-auto cursor-pointer">
                  <img src={ruIcon} alt="russian" />
                </div>
              </Popover>
            ) : (
              <Select
                defaultValue={defaultLanguage}
                className="w-full"
                size="large"
                onChange={handleLanguageChange}
                options={languageOptions}
                suffixIcon={
                  !collapsed ? <img src={downIcon} alt="arrow down" /> : null
                }
                style={{
                  fontSize: "15px",
                  lineHeight: "18px", // TODO: fix select height and font size
                }}
              />
            )}

            {collapsed ? (
              <Popover
                arrow={false}
                content={<PopoverContent />}
                title=""
                trigger="click"
              >
                <div
                  className={clsx(
                    "flex justify-between items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5] cursor-pointer",
                    profileCollapseClasses,
                  )}
                >
                  <img src={personIcon} alt="profile" />
                </div>
              </Popover>
            ) : null}

            {!collapsed ? (
              <div className="flex justify-between items-center bg-white rounded-xl p-[11px] border border-[#f5f5f5]">
                <div className="flex flex-col">
                  <span className="font-medium text-[15px]">
                    {`${user.first_name} ${user.last_name} ${user.middle_name}`}
                  </span>
                  <span className="text-[12px] text-[#8498B4]">
                    {t("inspector")}
                  </span>
                </div>

                <Popover
                  arrow={false}
                  content={<PopoverContent />}
                  title=""
                  trigger="click"
                >
                  <img src={moreIcon} alt="more" className="cursor-pointer" />
                </Popover>
              </div>
            ) : null}
          </div>
        </div>
      </Sider>
      <Layout>{children}</Layout>
    </Layout>
  );
}

const profileCollapseClasses = "w-12 m-auto";

function PopoverContent(): React.ReactElement {
  const { t } = useTranslation();
  const { setUser } = useAuthContext();

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
    confirm({
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

  return (
    <div className="flex flex-col gap-2">
      <Button icon={<UserOutlined />}>{t("profile")}</Button>

      <Button icon={<LogoutOutlined />} onClick={showDeleteConfirm}>
        {t("logout")}
      </Button>
    </div>
  );
}
