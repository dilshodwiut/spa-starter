import ReactPlayer from "react-player";
import { Button, Select, Tag, Row, Col, Divider, Upload, Carousel } from "antd";
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
import CustomCard from "../../components/custom-card";
import ActionBox from "../../components/action-box";
import Info from "../../components/info";
import SendIcon from "../../components/send-icon";
import useActState from "./state";
import { updateViolationType } from "../../api";

const statusMap = {
  created: "non-processed",
  defined: "processed",
  sent: "sent",
  rejected: "cancelled",
  performed: "overdued",
};

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
    isCarouselModalOpen,
    isActsModalOpen,
    data,
    actsList,
    violationTypes,
    carouselRef,
    handleOk,
    handleCancel,
    handleCarouselModalCancel,
    handleActsModalCancel,
    showCarouselModal,
    showModal,
    showActsList,
    notify,
    goBack,
    onImgClick,
    t,
  } = useActState();

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
            value={
              data?.act_date !== undefined && data?.act_date !== null
                ? formatDate(data?.act_date)
                : null
            }
          />
        </div>
        <Divider className="mt-3" />

        <Info of={t("choose-annulment-reason")} className="flex flex-col gap-2">
          <Select placeholder={t("reason")} />
          <TextArea rows={4} placeholder={t("note") ?? ""} />

          <div className="flex items-center gap-4">
            <Upload {...uploadProps}>
              <Button
                icon={<SendIcon />}
                className="flex items-center text-[#8498B4]"
              >
                {t("upload-file")}
              </Button>
            </Upload>

            <div className="flex flex-col text-xs text-[#8498B4]">
              <p>{t("max-file-size")}</p>
              <p>{t("max-file-count")}</p>
            </div>
          </div>
        </Info>
      </CustomModal>

      <CustomModal
        title={<Title level={4}>{t("pictures")}</Title>}
        open={isCarouselModalOpen}
        footer={null}
        onCancel={handleCarouselModalCancel}
      >
        <Carousel ref={carouselRef}>
          <div className="m-0 h-80 text-white text-center leading-[160px]">
            <img
              src={img1}
              alt="img 1"
              className="w-full h-full cursor-pointer"
              onClick={() => {
                showCarouselModal();
              }}
              aria-hidden
            />
          </div>
          <div className="m-0 h-80 text-white text-center leading-[160px]">
            <img
              src={img2}
              alt="img 2"
              className="w-full cursor-pointer"
              onClick={() => {
                showCarouselModal();
              }}
              aria-hidden
            />
          </div>
          <div className="m-0 h-80 text-white text-center leading-[160px]">
            <img
              src={img3}
              alt="img 3"
              className="w-full cursor-pointer"
              onClick={() => {
                showCarouselModal();
              }}
              aria-hidden
            />
          </div>
          <div className="m-0 h-80 text-white text-center leading-[160px]">
            <ReactPlayer
              width={472}
              url="https://www.youtube.com/watch?v=9nzPNSzzY7Q"
            />
          </div>
        </Carousel>
      </CustomModal>

      <CustomModal
        title={<Title level={4}>{t("acts-list")}</Title>}
        open={isActsModalOpen}
        footer={null}
        onCancel={handleActsModalCancel}
      >
        {actsList.map(({ id, series, number }) => (
          <div key={id} className="flex gap-8 mt-4">
            <Info of={t("series")} value={series} />
            <Info of={t("number")} value={number} />
          </div>
        ))}
      </CustomModal>

      <Header
        style={{ background: colorBgContainer }}
        className="px-8 pt-2 flex items-center gap-4"
      >
        <button type="button" onClick={goBack}>
          <img src={backIcon} alt="back" width={24} height={24} />
        </button>

        <h1 className="font-semibold text-2xl">
          {t("act-details")} {data?.series ?? ""} {data?.number ?? ""}
        </h1>

        <div className="flex items-center gap-2">
          {data?.status !== undefined ? (
            <Tag bordered={false} color="default" className="py-1 px-2">
              <span style={{ color: "#62738C" }}>
                {t(statusMap[data?.status])}
              </span>
            </Tag>
          ) : null}

          {data?.parent_id !== null && data?.parent_id !== undefined ? (
            <Button
              type="ghost"
              className="text-orange-400 border-orange-400"
              onClick={showActsList}
            >
              {t("edited")}
            </Button>
          ) : null}
        </div>
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
                {data?.violation_person?.avatar !== undefined &&
                data?.violation_person?.avatar !== "" ? (
                  <Col span={5}>
                    <img
                      src={`${import.meta.env.VITE_CDN_URL}${
                        data?.violation_person?.avatar
                      }`}
                      alt="violator"
                    />
                  </Col>
                ) : null}
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
                      className="2xl:w-[180px] lg:w-32 sm:w-20 cursor-pointer"
                      onClick={() => {
                        onImgClick(0);
                      }}
                      aria-hidden
                    />
                    <img
                      src={img2}
                      alt="img 2"
                      className="2xl:w-[180px] lg:w-32 sm:w-20 cursor-pointer"
                      onClick={() => {
                        onImgClick(1);
                      }}
                      aria-hidden
                    />
                    <img
                      src={img3}
                      alt="img 3"
                      className="2xl:w-[180px] lg:w-32 sm:w-20 cursor-pointer"
                      onClick={() => {
                        onImgClick(2);
                      }}
                      aria-hidden
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
                  value={
                    data?.total_sum !== undefined
                      ? formatAmount(data?.total_sum)
                      : ""
                  }
                />
              </div>
            </CustomCard>
          </Col>
        </Row>

        <br />

        <div className="flex items-stretch flex-wrap gap-6">
          <ActionBox
            color="blue"
            className="flex-1"
            actionKey="F5"
            Icon={CheckCircleFilled}
            onDispatchAction={async () => {
              try {
                throw new Error("WTF");

                await updateViolationType(actId!, {
                  violation_type: violationTypes[0].value,
                });

                void notify(
                  `${t("act")} BH 2240106381566 ${t(
                    "confirmed-admin-violation",
                  )}`,
                  "success",
                );
              } catch {
                void notify(`${t("error")}`, "error");
              }
            }}
          >
            {t("approve-admin-violation")}
          </ActionBox>
          <ActionBox
            color="green"
            className="flex-1"
            actionKey="F6"
            Icon={CheckCircleFilled}
            onDispatchAction={async () => {
              try {
                throw new Error("WTF");

                await updateViolationType(actId!, {
                  violation_type: violationTypes[1].value,
                });

                void notify(
                  `${t("act")} BH 2240106381566 ${t(
                    "confirmed-criminal-violation",
                  )}`,
                  "success",
                );
              } catch {
                void notify(`${t("error")}`, "error");
              }
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
              void notify(t("pdf-downloaded"), "success");
            }}
          >
            {t("download-pdf")}
          </ActionBox>
        </div>

        <div className="flex items-stretch flex-wrap gap-6 mt-6">
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
              // void notify();
            }}
          >
            {t("next")}
          </ActionBox>
        </div>
      </Content>
    </>
  );
}
