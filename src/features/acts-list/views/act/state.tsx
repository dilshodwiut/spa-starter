import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Input, theme, message } from "antd";
import type { UploadProps } from "antd";
import type { NoticeType } from "antd/es/message/interface";
import type { ActState } from "../../types";

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const doSomeAction = async (
    successMessage: string,
    type: NoticeType,
  ): Promise<void> => {
    void messageApi.open({
      key: "custom",
      type: "loading",
      content: "Action in progress...",
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
        content: "Error",
        duration: 2.5,
      });
    }
  };

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
    handleOk,
    handleCancel,
    showModal,
    doSomeAction,
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
