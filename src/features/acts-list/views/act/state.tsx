import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { Layout, Typography, Input, theme, message, Button } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { NoticeType } from "antd/es/message/interface";
import type { CarouselRef } from "antd/es/carousel";
import type { MediaFile } from "@/types";
import type { ActState } from "../../types";
import downloadFile from "../../helpers/download-file";
import getFileData from "../../helpers/get-file-data";
import { getAct, getAllActs, getViolationTypes } from "../../api";

const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const uploadProps: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

const renderFile = (file: MediaFile): React.ReactNode => {
  if (file.type === "image") {
    return (
      <div
        key={file.file}
        className="m-0 h-[360px] text-white text-center leading-[160px]"
      >
        <img
          src={`${import.meta.env.VITE_MEDIA_URL}/${file.file}`}
          alt="violation"
          className="w-full h-full"
        />
      </div>
    );
  }

  if (file.type === "video") {
    return (
      <div
        key={file.file}
        className="m-0 h-[360px] text-white text-center leading-[160px] bg-black"
      >
        <ReactPlayer width={472} url={file.file} controls playing light />
      </div>
    );
  }

  return (
    <div className="h-[360px]">
      <div className="h-full flex flex-col justify-center items-center">
        <CloudDownloadOutlined style={{ fontSize: "8rem" }} />
        <Button
          onClick={() => {
            downloadFile(
              `${import.meta.env.VITE_MEDIA_URL}/${file.file ?? ""}`,
              getFileData("filename", file.file),
            );
          }}
        >
          Download {getFileData("ext", file.file)} file
        </Button>
      </div>
    </div>
  );
};

export default function useActState(): ActState {
  const { actId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCarouselModalOpen, setIsCarouselModalOpen] =
    useState<boolean>(false);
  const [isActsModalOpen, setIsActsModalOpen] = useState<boolean>(false);
  const [actionInProcess, setActionInProcess] = useState({
    admin: false,
    criminal: false,
    cancel: false,
  });

  const carouselRef = useRef<CarouselRef>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: ["act", actId],
    queryFn: async () => {
      const res = await getAct(actId!);
      return res;
    },
    enabled: Boolean(actId),
  });

  const {
    data: actsData,
    isLoading: isActsDataLoading,
    error: actsListError,
  } = useQuery({
    queryKey: ["acts", { series: data?.series, number: data?.number }],
    queryFn: async () => {
      const res = await getAllActs({
        series: data?.series,
        number: data?.number,
      });
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
    enabled: Number.isInteger(data?.parent_id),
  });

  let actsList = actsData?.results.map(({ id, series, number }) => ({
    id,
    series,
    number,
  }));
  actsList ??= [];

  const { data: violationsData, isLoading: isViolationsDataLoading } = useQuery(
    {
      queryKey: ["violation-types"],
      queryFn: async () => {
        const res = await getViolationTypes();
        return res;
      },
      placeholderData: { count: 0, next: null, previous: null, results: [] },
    },
  );

  const violationTypes = violationsData?.results ?? [];

  const isCurrFetching =
    isLoading || isActsDataLoading || isViolationsDataLoading;

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const handleCarouselModalCancel = (): void => {
    setIsCarouselModalOpen(false);
  };

  const onImgClick = (index: number): void => {
    setIsCarouselModalOpen(true);
    setTimeout(() => {
      carouselRef.current?.goTo(index, false);
    }, 0);
  };

  const showActsList = (): void => {
    setIsActsModalOpen(true);
  };

  const handleActsModalCancel = (): void => {
    setIsActsModalOpen(false);
  };

  const notify = async (msg: string, type: NoticeType): Promise<void> => {
    void messageApi.open({
      key: "custom",
      type,
      content: msg,
      duration: 2.5,
    });
  };

  useEffect(() => {
    if (error !== null) {
      void messageApi.error({
        key: "acts-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: error?.statusText,
      });
    }

    if (actsListError !== null) {
      void messageApi.error({
        key: "acts-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: actsListError?.statusText,
      });
    }
  }, [error, actsListError, messageApi]);

  return {
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
    isCurrFetching,
    actionInProcess,
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
    t,
    setActionInProcess,
  };
}
