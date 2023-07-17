import {
  Button,
  Select,
  Space,
  Tag,
  Row,
  Col,
  Divider,
  Upload,
  QRCode,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileTextFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import CustomModal from "@/components/modal";
import img1 from "@/assets/img_1.png";
import img2 from "@/assets/img_2.png";
import img3 from "@/assets/img_3.png";
import violatorImg from "@/assets/portrait.png";
import CustomCard from "../../components/custom-card";
import SettingsIcon from "../../components/settings-icon";
import ActionBox from "../../components/action-box";
import Info from "../../components/info";
import SendIcon from "../../components/send-icon";
import DownloadIcon from "../../components/download-icon";
import useActState from "./state";

const isInspector = false;

export default function Act(): React.ReactElement {
  const {
    Header,
    Content,
    Title,
    TextArea,
    contextHolder,
    colorBgContainer,
    actId,
    uploadProps,
    isModalOpen,
    handleOk,
    handleCancel,
    showModal,
    doSomeAction,
    t,
  } = useActState();

  return (
    <>
      {contextHolder}
      {isInspector ? (
        <CustomModal
          title={
            <>
              <Title level={4}>{t("act-annulment")}</Title>
              <Divider className="mt-3" />
            </>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <>
              <Divider className="mb-3" />
              <div>
                <Button onClick={handleCancel}>{t("cancel")}</Button>
                <Button onClick={handleOk}>{t("approve")}</Button>
              </div>
            </>
          }
        >
          <div className="flex">
            <Info
              rootClassName="flex-1"
              of={t("act-serial-number")}
              value="BH 122432234435"
            />
            <Info
              rootClassName="flex-1"
              of={t("reg-date")}
              value="04.06.2023"
            />
          </div>
          <Divider className="mt-3" />

          <Info
            of={t("choose-annulment-reason")}
            className="flex flex-col gap-2"
          >
            <Select placeholder={t("reason")} />
            <TextArea rows={4} placeholder={t("note") ?? ""} />

            <div className="flex items-center gap-4">
              <Upload {...uploadProps}>
                <Button icon={<SendIcon />}>{t("upload-file")}</Button>
              </Upload>

              <div className="flex flex-col text-xs text-[#8498B4]">
                <p>{t("max-file-size")}</p>
                <p>{t("max-file-count")}</p>
              </div>
            </div>
          </Info>
        </CustomModal>
      ) : null}

      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex justify-between items-baseline"
      >
        <Title level={3} className="flex gap-6 items-center">
          {t("act-details")} BH {actId}
          <div className="flex items-center gap-2">
            <Tag bordered={false} color="default" className="py-1 px-2">
              <span style={{ color: "#62738C" }}>{t("not-processed")}</span>
            </Tag>
            <Tag bordered={false} color="orange" className="py-1 px-2">
              <span>{t("edited")}</span>
            </Tag>
          </div>
        </Title>

        {isInspector ? (
          <Space size="large">
            <Select
              placeholder="Choose city"
              defaultValue="tashkent_city"
              className="w-64"
              size="large"
              onChange={(value: string) => {
                console.log(value);
              }}
              options={[
                { value: "tashkent_city", label: t("tashkent-city") },
                { value: "fergana_city", label: t("fergana-city") },
              ]}
            />
            <Button
              className="bg-[#d8f3dc] border-none font-bold flex items-center p-6 gap-1 rounded-xl"
              icon={<SettingsIcon className="text-[#40916c]" />}
            >
              {t("filter")}
            </Button>
          </Space>
        ) : null}
      </Header>

      <Content
        className="p-8"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        {isInspector ? (
          <Row gutter={24}>
            <Col span={12}>
              <CustomCard title={t("violator-details")}>
                <Row gutter={24}>
                  <Col span={5}>
                    <div>
                      <img src={violatorImg} alt="violator" />
                    </div>
                  </Col>
                  <Col span={19}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Info
                          of={t("fullname")}
                          value="Norov Ilkhom Ibragimovich"
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row gutter={24}>
                      <Col span={12}>
                        <Info of={t("dob")} value="27.09.1985" />
                      </Col>
                      <Col span={12}>
                        <Info of={t("phone")} value="+998 (98) 180-00-62" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={24}>
                    <Info
                      of={t("birthplace")}
                      value="The Republic of Uzbekistan, Bukhara region, Gijudvon district"
                      valueClassName="xl:w-2/4 lg:w-full"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={8}>
                    <Info of={t("passport")} value="AA 1475156" />
                  </Col>
                  <Col span={8}>
                    <Info of={t("citizenship")} value="Uzbekistan" />
                  </Col>
                  <Col span={8}>
                    <Info of={t("nationality")} value="Uzbek" />
                  </Col>
                </Row>
              </CustomCard>
              <br />
              <CustomCard title={t("organization-information")}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Info of={t("name")} value="Buxoro neft baza MCHJ" />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("activity-kind")}
                      value="Storage of petroleum products"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={7}>
                    <Info of={t("inn")} value="300 097 878" />
                  </Col>
                  <Col span={10}>
                    <Info of={t("user-number-in-system")} value="10070021321" />
                  </Col>
                  <Col span={7}>
                    <Info of={t("inventory-number")} value="12:34:56:7890" />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={24}>
                    <Info
                      of={t("legal-address")}
                      value="The Republic of Uzbekistan, Tashkent city, Mirzo Ulugbek region, TTZ-2"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("director's-fullname")}
                      value="Norov Ilkhom Ibragimovich"
                    />
                  </Col>
                  <Col span={12}>
                    <Info of={t("phone")} value="+998 (98) 180-00-62" />
                  </Col>
                </Row>
              </CustomCard>
            </Col>
            <Col span={12}>
              <CustomCard title={t("violator-description")}>
                <div className="flex gap-8">
                  <Info
                    of={t("infringement-article")}
                    value="133 Band 1, Qism 3, Kichik band"
                    valueClassName="font-semibold text-xl"
                  />
                  <Info
                    of={t("additional-article")}
                    value="No"
                    valueClassName="font-semibold text-xl"
                  />
                </div>

                <br />
                <Info
                  of={t("violation-pictures")}
                  value={
                    <div className="flex gap-4 mt-4">
                      <img
                        src={img1}
                        alt="img 1"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                      <img
                        src={img2}
                        alt="img 2"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                      <img
                        src={img3}
                        alt="img 3"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                    </div>
                  }
                />
              </CustomCard>
              <br />

              <CustomCard title={t("organization-compiled-document")}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("organization")}
                      value="Energetika Vazirligi Huzuridagi O'ZENERGOINSPEKSIYA"
                      rootClassName="flex-1"
                    />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("position")}
                      value="Director of organization"
                      rootClassName="flex-1"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("fullname")}
                      value="Khamroev Bekzod Khamzaevich"
                      rootClassName="flex-1"
                    />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("certificate")}
                      value="221"
                      rootClassName="flex-1"
                    />
                  </Col>
                </Row>
              </CustomCard>
              <br />
              <CustomCard title={t("illegal-gas-usage-calculation")}>
                <div className="flex gap-8">
                  <Info of={t("volume")} value="12 450 m^2" />
                  <Info of={t("amount")} value="2 050 000" />
                </div>
              </CustomCard>
            </Col>
          </Row>
        ) : null}

        {!isInspector ? (
          <Row gutter={24}>
            <Col span={18}>
              <CustomCard title={t("violator-description")}>
                <div className="flex gap-8">
                  <Info
                    of={t("infringement-article")}
                    value="133 Band 1, Qism 3, Kichik band"
                    valueClassName="font-semibold text-xl"
                  />
                  <Info
                    of={t("additional-article")}
                    value="No"
                    valueClassName="font-semibold text-xl"
                  />
                </div>

                <br />
                <Info
                  of={t("violation-pictures")}
                  value={
                    <div className="flex gap-4 mt-4">
                      <img
                        src={img1}
                        alt="img 1"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                      <img
                        src={img2}
                        alt="img 2"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                      <img
                        src={img3}
                        alt="img 3"
                        className="2xl:w-[180px] lg:w-32 sm:w-20"
                      />
                    </div>
                  }
                />
              </CustomCard>

              <br />

              <CustomCard title={t("violator-details")}>
                <Row gutter={24}>
                  <Col span={5}>
                    <div>
                      <img src={violatorImg} alt="violator" />
                    </div>
                  </Col>
                  <Col span={19}>
                    <Row gutter={24}>
                      <Col span={24}>
                        <Info
                          of={t("fullname")}
                          value="Norov Ilkhom Ibragimovich"
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row gutter={24}>
                      <Col span={12}>
                        <Info of={t("dob")} value="27.09.1985" />
                      </Col>
                      <Col span={12}>
                        <Info of={t("phone")} value="+998 (98) 180-00-62" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={24}>
                    <Info
                      of={t("birthplace")}
                      value="The Republic of Uzbekistan, Bukhara region, Gijudvon district"
                      valueClassName="xl:w-2/4 lg:w-full"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={8}>
                    <Info of={t("passport")} value="AA 1475156" />
                  </Col>
                  <Col span={8}>
                    <Info of={t("citizenship")} value="Uzbekistan" />
                  </Col>
                  <Col span={8}>
                    <Info of={t("nationality")} value="Uzbek" />
                  </Col>
                </Row>
              </CustomCard>

              <br />

              <CustomCard title={t("organization-information")}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Info of={t("name")} value="Buxoro neft baza MCHJ" />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("activity-kind")}
                      value="Storage of petroleum products"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={7}>
                    <Info of={t("inn")} value="300 097 878" />
                  </Col>
                  <Col span={10}>
                    <Info of={t("user-number-in-system")} value="10070021321" />
                  </Col>
                  <Col span={7}>
                    <Info of={t("inventory-number")} value="12:34:56:7890" />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={24}>
                    <Info
                      of={t("legal-address")}
                      value="The Republic of Uzbekistan, Tashkent city, Mirzo Ulugbek region, TTZ-2"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("director's-fullname")}
                      value="Norov Ilkhom Ibragimovich"
                    />
                  </Col>
                  <Col span={12}>
                    <Info of={t("phone")} value="+998 (98) 180-00-62" />
                  </Col>
                </Row>
              </CustomCard>

              <br />

              <CustomCard title={t("organization-compiled-document")}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("organization")}
                      value="Energetika Vazirligi Huzuridagi O'ZENERGOINSPEKSIYA"
                      rootClassName="flex-1"
                    />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("position")}
                      value="Director of organization"
                      rootClassName="flex-1"
                    />
                  </Col>
                </Row>
                <br />
                <Row gutter={24}>
                  <Col span={12}>
                    <Info
                      of={t("fullname")}
                      value="Khamroev Bekzod Khamzaevich"
                      rootClassName="flex-1"
                    />
                  </Col>
                  <Col span={12}>
                    <Info
                      of={t("certificate")}
                      value="221"
                      rootClassName="flex-1"
                    />
                  </Col>
                </Row>
              </CustomCard>

              <br />

              <CustomCard title={t("story")}>
                <p className="font-medium text-[#62738C]">
                  01/01/2023 at 17:35 Norov Ilkhom Ibragimovich, born on
                  09/27/1985, committed an offense under article
                  &quot;133-1k-3k&quot; in the Shofirkon district of Bukhara.
                  Including: It has been established that natural gas is used
                  without the permission of authorized organizations, without
                  design and technical documentation, without a contract.
                </p>
              </CustomCard>

              <br />

              <CustomCard title={t("violator's-explanatory-note")}>
                <p className="font-medium text-[#62738C]">
                  01/01/2023 at 17:35, I am Norov Ilkhom Ibragimovich, born on
                  09/27/1985, Bukhara, Shofirkon district, committed an offense
                  under paragraph &quot;133-1k-3k&quot;. Including: I used
                  natural gas without obtaining permission from authorized
                  organizations, without design and technical documentation,
                  without a contract.
                </p>
              </CustomCard>

              <br />

              <CustomCard title={t("illegal-gas-usage-calculation")}>
                <div className="flex gap-8">
                  <Info of={t("volume")} value="12 450 m^2" />
                  <Info of={t("amount")} value="2 050 000" />
                </div>
              </CustomCard>
            </Col>
            <Col span={6}>
              <CustomCard>
                <div className="flex flex-col gap-4">
                  <Info of={t("series")} value="BH" />
                  <Info of={t("number")} value="2323455656732" />
                  <Info of={t("dob")} value="04.06.2023" />
                  <Info
                    of={t("region, district")}
                    value="Bukhara region, Shofirkon district"
                  />

                  <div className="w-full bg-white flex justify-center rounded-lg">
                    <QRCode bgColor="white" bordered={false} value="Dilshod" />
                  </div>

                  <Button
                    className="bg-[#d8f3dc] border-none font-medium text-[15px] flex justify-center items-center p-6 gap-1 rounded-xl h-12"
                    icon={<DownloadIcon className="text-[#40916c]" />}
                  >
                    {t("download-doc")}
                  </Button>
                </div>
              </CustomCard>
            </Col>
          </Row>
        ) : null}

        {isInspector ? (
          <>
            <br />
            <div className="flex items-stretch gap-6">
              <ActionBox
                color="blue"
                className="flex-1"
                actionKey="F5"
                Icon={CheckCircleFilled}
                onDispatchAction={() => {
                  void doSomeAction(
                    `${t("act")} BH 2240106381566 ${t(
                      "confirmed-admin-violation",
                    )}`,
                    "success",
                  );
                }}
              >
                {t("approve-admin-violation")}
              </ActionBox>
              <ActionBox
                color="green"
                className="flex-1"
                actionKey="F6"
                Icon={CheckCircleFilled}
                onDispatchAction={() => {
                  void doSomeAction(
                    `${t("act")} BH 2240106381566 ${t(
                      "confirmed-criminal-violation",
                    )}`,
                    "success",
                  );
                }}
              >
                {t("approve-criminal-violation")}
              </ActionBox>
              <ActionBox
                color="grey"
                className="flex-1"
                actionKey="F7"
                Icon={FileTextFilled}
                onDispatchAction={() => {
                  void doSomeAction(t("pdf-downloaded"), "success");
                }}
              >
                {t("download-pdf")}
              </ActionBox>
              <ActionBox
                color="red"
                className="flex-1"
                actionKey="F8"
                Icon={CloseCircleFilled}
                onDispatchAction={showModal}
              >
                {t("cancel-act")}
              </ActionBox>
              <ActionBox
                color="green"
                className="flex-1"
                actionKey="F9"
                Icon={RightCircleFilled}
                iconPosition="right"
                onDispatchAction={() => {
                  // void doSomeAction();
                }}
              >
                {t("next")}
              </ActionBox>
            </div>
          </>
        ) : null}
      </Content>
    </>
  );
}
