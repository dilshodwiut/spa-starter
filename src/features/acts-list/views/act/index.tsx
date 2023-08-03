import { Button, Select, Tag, Row, Col, Divider, Upload, Carousel } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileTextFilled,
  RightCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { PatternFormat } from "react-number-format";
import clsx from "clsx";
import CustomModal from "@/components/modal";
import backIcon from "@/assets/arrow-left.svg";
import formatDate from "../../helpers/format-date";
import formatAmount from "../../helpers/format-amount";
import CustomCard from "../../components/custom-card";
import ActionBox from "../../components/action-box";
import Info from "../../components/info";
import SendIcon from "../../components/send-icon";
import useActState from "./state";
import formatPhoneNumber from "../../helpers/format-phone-number";

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
    uploadProps,
    isModalOpen,
    isCarouselModalOpen,
    isActsModalOpen,
    data,
    actsList,
    violationTypes,
    carouselRef,
    isCurrFetching,
    actionInProcess,
    violTypeMutation,
    note,
    reason,
    reasons,
    handleOk,
    handleCancel,
    handleCarouselModalCancel,
    handleActsModalCancel,
    showModal,
    showActsList,
    notify,
    goBack,
    onImgClick,
    renderFile,
    setNote,
    setReason,
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
        onCancel={handleCancel}
        footer={
          <>
            <Divider className="mb-3" />
            <div>
              <Button disabled={actionInProcess.cancel} onClick={handleCancel}>
                {t("cancel")}
              </Button>
              <Button loading={actionInProcess.cancel} onClick={handleOk}>
                {t("approve")}
              </Button>
            </div>
          </>
        }
      >
        <div className="flex">
          <Info
            rootClassName="flex-1"
            of={t("act-serial-number")}
            value={`${data?.series ?? ""} ${data?.number ?? ""}`}
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
          <Select
            placeholder={t("reason")}
            options={reasons}
            value={reason}
            onChange={(val) => {
              setReason(val);
            }}
          />
          <TextArea
            rows={4}
            placeholder={t("note") ?? ""}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />

          <div className="flex items-center gap-4">
            <Upload {...uploadProps}>
              <Button icon={<SendIcon />} className="flex items-center 8498B4]">
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
        title={<Title level={4}>{t("files")}</Title>}
        open={isCarouselModalOpen}
        footer={null}
        onCancel={handleCarouselModalCancel}
      >
        <Carousel
          ref={carouselRef}
          dots={{
            className:
              "absolute bottom-0 bg-black h-8 flex justify-center items-center",
          }}
        >
          {data?.files?.map(renderFile)}
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
                ) : (
                  <Col
                    span={5}
                    className="flex justify-center items-center border"
                  >
                    <UserOutlined
                      style={{
                        fontSize: "3rem",
                      }}
                    />
                  </Col>
                )}
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
                        value={formatPhoneNumber(
                          data?.violation_person?.phone ?? "",
                          "+### ## ### ## ##",
                        )}
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
                    of={t("nationality")}
                    value={data?.violation_person?.nationality}
                  />
                </Col>
                <Col span={8}>
                  <Info
                    of={t("citizenship")}
                    value={data?.violation_person?.citizenship}
                  />
                </Col>
              </Row>
            </CustomCard>

            <br />

            {data?.is_juridic === true ? (
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
                      value={formatPhoneNumber(
                        data?.violation_organization?.phone ?? "",
                        "+### ## ### ## ##",
                      )}
                    />
                  </Col>
                </Row>
              </CustomCard>
            ) : null}
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
                  value={t("no")}
                  valueClassName="font-semibold text-xl"
                />
              </div>

              <br />

              <Info
                of={t("violation-files")}
                value={
                  <div className="flex gap-4 mt-4">
                    {data?.files
                      ?.filter((file) => file.type === "image")
                      .map((file, index) => (
                        <img
                          key={file.file}
                          src={`${import.meta.env.VITE_MEDIA_URL}/${file.file}`}
                          alt="violation"
                          className="2xl:w-[180px] lg:w-32 sm:w-20 cursor-pointer"
                          onClick={() => {
                            onImgClick(index);
                          }}
                          aria-hidden
                        />
                      ))}
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
                    of={t("fullname")}
                    value={`${data?.employee?.first_name ?? ""} ${
                      data?.employee?.last_name ?? ""
                    } ${data?.employee?.middle_name ?? ""}`}
                    rootClassName="flex-1"
                  />
                </Col>
              </Row>

              <br />

              <Row gutter={24}>
                <Col span={12}>
                  <Info
                    of={t("position")}
                    value={data?.employee?.position}
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
                <Info
                  of={t("volume")}
                  value={
                    data?.total_volume !== undefined ? (
                      <span>
                        {formatAmount(data?.total_volume)} m<sup>3</sup>
                      </span>
                    ) : (
                      ""
                    )
                  }
                />
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
            isDisabled={isCurrFetching || data?.violation_type !== null}
            isLoading={actionInProcess.admin}
            color="blue"
            className={clsx(
              "flex-1",
              data?.violation_type !== null ? "cursor-not-allowed" : "",
            )}
            actionKey="F5"
            Icon={CheckCircleFilled}
            onDispatchAction={async () => {
              if (data?.violation_type === null) {
                const foundViolType = violationTypes?.find(
                  (violation) => violation.key === "administrative",
                );

                violTypeMutation.mutate({
                  violation_type: foundViolType?.id,
                });
              }
            }}
          >
            {t("approve-admin-violation")}
          </ActionBox>
          <ActionBox
            isDisabled={isCurrFetching || data?.violation_type !== null}
            isLoading={actionInProcess.criminal}
            color="green"
            className={clsx(
              "flex-1",
              data?.violation_type !== null ? "cursor-not-allowed" : "",
            )}
            actionKey="F6"
            Icon={CheckCircleFilled}
            onDispatchAction={async () => {
              if (data?.violation_type === null) {
                const foundViolType = violationTypes?.find(
                  (violation) => violation.key === "criminal",
                );

                violTypeMutation.mutate({
                  violation_type: foundViolType?.id,
                });
              }
            }}
          >
            {t("approve-criminal-violation")}
          </ActionBox>
          <ActionBox
            isDisabled={isCurrFetching}
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
            isDisabled={isCurrFetching || data?.violation_type !== null}
            isLoading={actionInProcess.cancel}
            color="red"
            className={clsx(
              "flex-1",
              data?.violation_type !== null ? "cursor-not-allowed" : "",
            )}
            actionKey="F8"
            Icon={CloseCircleFilled}
            onDispatchAction={() => {
              if (data?.violation_type === null) {
                showModal();
              }
            }}
          >
            {t("cancel-act")}
          </ActionBox>
          <ActionBox
            isDisabled={isCurrFetching}
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
