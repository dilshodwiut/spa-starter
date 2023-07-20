import { Button, Select, Space, Tag, Row, Col, Divider, Upload } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileTextFilled,
  RightCircleFilled,
} from "@ant-design/icons";
import formatDate from "@/helpers/formatDate";
import formatAmount from "@/helpers/formatAmount";
import CustomModal from "@/components/modal";
import img1 from "@/assets/img_1.png";
import img2 from "@/assets/img_2.png";
import img3 from "@/assets/img_3.png";
import backIcon from "@/assets/arrow-left.svg";
import violatorImg from "@/assets/portrait.png";
import CustomCard from "../../components/custom-card";
import SettingsIcon from "../../components/settings-icon";
import ActionBox from "../../components/action-box";
import Info from "../../components/info";
import SendIcon from "../../components/send-icon";
import useActState from "./state";

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
    data,
    handleOk,
    handleCancel,
    showModal,
    doSomeAction,
    goBack,
    t,
  } = useActState();

  console.log("single act data: ", data);

  return (
    <>
      {contextHolder}
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
            value={`${data?.act_series ?? ""} ${data?.act_number ?? ""}`}
          />
          <Info
            rootClassName="flex-1"
            of={t("reg-date")}
            value={formatDate(data?.act_date ?? "")}
          />
        </div>
        <Divider className="mt-3" />

        <Info of={t("choose-annulment-reason")} className="flex flex-col gap-2">
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

      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button type="button" onClick={goBack}>
            <img src={backIcon} alt="back" width={24} height={24} />
          </button>

          <h1 className="font-semibold text-2xl">
            {t("act-details")} BH {actId}
          </h1>

          <div className="flex items-center gap-2">
            <Tag bordered={false} color="default" className="py-1 px-2">
              <span style={{ color: "#62738C" }}>{t("not-processed")}</span>
            </Tag>
            <Tag bordered={false} color="orange" className="py-1 px-2">
              <span>{t("edited")}</span>
            </Tag>
          </div>
        </div>

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
      </Header>

      <Content
        className="p-8"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
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
                        value={`${data?.violation_person?.last_name ?? ""} ${
                          data?.violation_person?.first_name ?? ""
                        } ${data?.violation_person?.middle_name ?? ""}`}
                      />
                    </Col>
                  </Row>

                  <br />

                  <Row gutter={24}>
                    <Col span={12}>
                      <Info
                        of={t("dob")}
                        value={data?.violation_person?.birth_date}
                      />
                    </Col>
                    <Col span={12}>
                      <Info
                        of={t("phone")}
                        value={data?.violation_person?.phone}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={24}>
                  <Info
                    of={t("birthplace")}
                    value={data?.violation_person?.place_of_birth}
                    valueClassName="xl:w-2/4 lg:w-full"
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={8}>
                  <Info
                    of={t("passport")}
                    value={`${data?.violation_person?.document_series ?? ""} ${
                      data?.violation_person?.document_number ?? ""
                    }`}
                  />
                </Col>
                <Col span={8}>
                  <Info
                    of={t("citizenship")}
                    value={data?.violation_person?.citizenship}
                  />
                </Col>
                <Col span={8}>
                  <Info
                    of={t("nationality")}
                    value={data?.violation_person?.nationality}
                  />
                </Col>
              </Row>
            </CustomCard>

            <br />

            <CustomCard title={t("organization-information")}>
              <Row gutter={24}>
                <Col span={12}>
                  <Info
                    of={t("name")}
                    value={data?.violation_organization?.name}
                  />
                </Col>
                <Col span={12}>
                  <Info
                    of={t("activity-kind")}
                    value={data?.violation_organization?.type}
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={7}>
                  <Info
                    of={t("inn")}
                    value={data?.violation_organization?.stir}
                  />
                </Col>
                <Col span={10}>
                  <Info
                    of={t("user-number-in-system")}
                    value={data?.violation_organization?.subscriber_number}
                  />
                </Col>
                <Col span={7}>
                  <Info
                    of={t("inventory-number")}
                    value={data?.violation_organization?.cadastral_number}
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={24}>
                  <Info
                    of={t("legal-address")}
                    value={data?.violation_organization?.address}
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={12}>
                  <Info
                    of={t("director's-fullname")}
                    value={data?.violation_organization?.director_fio}
                  />
                </Col>
                <Col span={12}>
                  <Info
                    of={t("phone")}
                    value={data?.violation_organization?.phone}
                  />
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
                    value={data?.employee?.organization?.name}
                    rootClassName="flex-1"
                  />
                </Col>
                <Col span={12}>
                  <Info
                    of={t("position")}
                    value={data?.employee?.position}
                    rootClassName="flex-1"
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={12}>
                  <Info
                    of={t("fullname")}
                    value={`${data?.employee?.first_name ?? ""} ${
                      data?.employee?.last_name ?? ""
                    } ${data?.employee?.middle_name ?? ""}`}
                    rootClassName="flex-1"
                  />
                </Col>
                <Col span={12}>
                  <Info
                    of={t("certificate")}
                    value={data?.employee.certificate}
                    rootClassName="flex-1"
                  />
                </Col>
              </Row>
            </CustomCard>

            <br />

            <CustomCard title={t("illegal-gas-usage-calculation")}>
              <div className="flex gap-8">
                <Info of={t("volume")} value={data?.total_volume} />
                <Info
                  of={t("amount")}
                  value={formatAmount(data?.total_sum ?? 0)}
                />
              </div>
            </CustomCard>
          </Col>
        </Row>

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
      </Content>
    </>
  );
}
