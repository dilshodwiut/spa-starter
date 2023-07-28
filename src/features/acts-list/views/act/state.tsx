import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Layout, Typography, Input, theme, message } from "antd";
import type { UploadProps, Carousel } from "antd";
import type { NoticeType } from "antd/es/message/interface";
import type { ActState } from "../../types";
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

export default function useActState(): ActState {
  const { actId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCarouselModalOpen, setIsCarouselModalOpen] =
    useState<boolean>(false);
  const [isActsModalOpen, setIsActsModalOpen] = useState<boolean>(false);

  const carouselRef = useRef<typeof Carousel>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data, error } = useQuery({
    queryKey: ["act", actId],
    queryFn: async () => {
      const res = await getAct(actId!);
      return res;
    },
    enabled: Boolean(actId),
  });

  const { data: actsData, error: actsListError } = useQuery({
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

  const { data: violationsData } = useQuery({
    queryKey: ["violation-types"],
    queryFn: async () => {
      const res = await getViolationTypes();
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let violationTypes = violationsData?.results.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  violationTypes ??= [];

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

  const showCarouselModal = (): void => {
    setIsCarouselModalOpen(true);
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

  const notify = async (
    successMessage: string,
    type: NoticeType,
  ): Promise<void> => {
    void messageApi.open({
      key: "custom",
      type: "loading",
      content: t("action-in-progress"),
    });

    try {
      await wait(1000);
      void messageApi.open({
        key: "custom",
        type,
        content: successMessage,
        duration: 2.5,
      });
    } catch (err) {
      console.log(err);
      void messageApi.open({
        key: "custom",
        type: "error",
        content: t("error"),
        duration: 2.5,
      });
    }
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
  };
}

async function wait(ms: number): Promise<number> {
  const result = await new Promise<number>((resolve) => {
    setTimeout((): void => {
      resolve(1);
    }, ms);
  });

  return result;
}
