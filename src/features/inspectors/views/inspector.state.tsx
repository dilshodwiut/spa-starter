import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout, Form, Input, theme } from "antd";
import type { InspectorState } from "../types";

const { Header, Content } = Layout;

export default function useInspectorState(): InspectorState {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = (): void => {
    console.log("cancel");
    setIsModalOpen(false);
  };

  const goBack = (): void => {
    navigate(-1);
  };

  return {
    Header,
    Content,
    Form,
    Input,
    colorBgContainer,
    goBack,
    isModalOpen,
    handleCancel,
    t,
  };
}
