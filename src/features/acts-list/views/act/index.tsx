import { Button, Select, Tag, Divider, Upload, Carousel } from "antd";
import CustomModal from "@/components/modal";
import backIcon from "@/assets/arrow-left.svg";
import formatDate from "../../helpers/format-date";
import Info from "../../components/info";
import SendIcon from "../../components/send-icon";
import useActState from "./state";
import InspectorView from "./inspector-view";
import ProsecutorView from "./prosecutor-view";

const isInspector = true;

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
    carouselRef,
    actionInProcess,
    note,
    reason,
    reasons,
    statusMap,
    handleOk,
    handleCancel,
    handleCarouselModalCancel,
    handleActsModalCancel,
    showActsList,
    goBack,
    renderFile,
    setNote,
    setReason,
    t,
  } = useActState();

  return (
    <>
      {contextHolder}
      {isInspector ? (
        <>
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
                  <Button
                    disabled={actionInProcess.cancel}
                    onClick={handleCancel}
                  >
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

            <Info
              of={t("choose-annulment-reason")}
              className="flex flex-col gap-2"
            >
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
                  <Button
                    icon={<SendIcon />}
                    className="flex items-center 8498B4]"
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
        </>
      ) : null}

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
        {!isInspector ? <ProsecutorView /> : <InspectorView />}
      </Content>
    </>
  );
}
