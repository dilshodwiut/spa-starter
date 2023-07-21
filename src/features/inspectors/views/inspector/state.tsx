import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { clone } from "ramda";
import { Layout, Form, Input, theme, message } from "antd";
import type { FormValues, InspectorState } from "../../types";
import { createInspector, getInspector, updateInspector } from "../../api";

const { Header, Content } = Layout;

export default function useInspectorState(): InspectorState {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { inspectorId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const form = Form.useForm()[0];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["inspector", inspectorId],
    queryFn: async () => {
      const res = await getInspector(inspectorId!);
      return res;
    },
    enabled: Boolean(inspectorId),
  });

  const mutationFn = async (formData: FormValues): Promise<void> => {
    if (typeof inspectorId === "string") {
      await updateInspector(inspectorId, formData);
    } else {
      await createInspector(formData);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn,
    onSuccess: () => {
      setIsModalOpen(true);
    },
    onError: (error: { data: { detail: string } }) => {
      void messageApi.error({
        content: error.data.detail,
      });
    },
  });

  const handleCancel = (): void => {
    console.log("cancel");
    setIsModalOpen(false);
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const submitHandler = (values: FormValues): void => {
    console.log(values);
    mutate(values);
  };

  useEffect(() => {
    const initialValues = (function populateForm() {
      if (typeof data !== "undefined") {
        return clone(data);
      }
      return {};
    })();

    form.setFieldsValue(initialValues);
  }, [data, form]);

  console.log(data);

  return {
    Header,
    Content,
    Form,
    Input,
    colorBgContainer,
    isModalOpen,
    inspectorId,
    form,
    isLoading,
    contextHolder,
    goBack,
    handleCancel,
    submitHandler,
    t,
  };
}
