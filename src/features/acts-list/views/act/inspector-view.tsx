import { Row, Col } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FileTextFilled,
  RightCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import formatAmount from "@/helpers/format-amount";
import CustomCard from "@/components/custom-card";
import folderIcon from "@/assets/folder.svg";
import formatPhoneNumber from "../../helpers/format-phone-number";
import ActionBox from "../../components/action-box";
import Info from "../../components/info";
import useActState from "./state";
import renderArticlesById from "../../helpers/render-articles-by-id";

export default function InspectorView(): React.ReactElement {
  const {
    data,
    violationTypes,
    isCurrFetching,
    actionInProcess,
    violTypeMutation,
    infringementArticle,
    articles,
    showModal,
    notify,
    onImgClick,
    t,
  } = useActState();

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <CustomCard title={t("violator-details")}>
            <Row gutter={24}>
              <Col span={5} className="flex justify-center items-center border">
                {data?.violation_person?.avatar !== undefined &&
                data?.violation_person?.avatar !== "" ? (
                  <img
                    src={`${import.meta.env.VITE_MEDIA_URL}/${
                      data?.violation_person?.avatar
                    }`}
                    alt="violator"
                  />
                ) : (
                  <UserOutlined
                    style={{
                      fontSize: "3rem",
                    }}
                  />
                )}
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
                value={infringementArticle}
                valueClassName="font-semibold text-xl"
              />
              <Info
                of={t("additional-article")}
                value={
                  data?.violation?.additional_articles.length === 0
                    ? t("no")
                    : renderArticlesById(
                        articles,
                        data?.violation?.additional_articles ?? [],
                      )
                }
                valueClassName="font-semibold text-xl"
              />
            </div>

            <br />

            <Info
              of={t("violation-files")}
              value={
                <div className="flex flex-wrap gap-4 mt-4">
                  {typeof data?.files?.length === "number" &&
                  data?.files?.length > 0 ? (
                    data?.files
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
                      ))
                  ) : (
                    <div className="w-full flex items-center justify-center border p-4 rounded-xl">
                      <div className="flex flex-col items-center gap-2">
                        <img src={folderIcon} alt="folder" width={24} />
                        <span className="text-[#62738C] font-normal text-xs w-28 text-center">
                          {t("no-files-up")}
                        </span>
                      </div>
                    </div>
                  )}
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

              if (foundViolType !== undefined) {
                violTypeMutation.mutate({
                  violation_type: foundViolType?.id,
                });
              }
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

              if (foundViolType !== undefined) {
                violTypeMutation.mutate({
                  violation_type: foundViolType?.id,
                });
              }
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
    </>
  );
}
