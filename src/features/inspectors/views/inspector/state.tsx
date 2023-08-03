import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { clone } from "ramda";
import { lightFormat } from "date-fns";
import { Layout, Form, Input, theme, message } from "antd";
import { getRegions } from "@/features/acts-list";
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
  const [selectedRegion, setSelectedRegion] = useState<number>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data, error } = useQuery({
    queryKey: ["inspector", inspectorId],
    queryFn: async () => {
      const res = await getInspector(inspectorId!);
      return res;
    },
    enabled: Boolean(inspectorId),
  });

  const { data: locations, error: locationsError } = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await getRegions();
      return res;
    },
    placeholderData: { count: 0, next: null, previous: null, results: [] },
  });

  let regions = locations?.results.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
  regions ??= [];

  const districts = useMemo(() => {
    const location = locations?.results.find(
      (loc) => loc.id === selectedRegion,
    );

    if (typeof location !== "undefined") {
      return location?.districts.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }

    return [];
  }, [selectedRegion, locations?.results]);

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
    onError: (_error: { data: { detail: string } }) => {
      void messageApi.error({
        content: _error.data.detail,
      });
    },
  });

  const handleRegionChange = (value: number): void => {
    setSelectedRegion(value);
    form.setFieldValue("district", undefined);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const submitHandler = (values: FormValues): void => {
    const fields = clone(values);
    if (values.birth_date !== undefined && values.birth_date !== null) {
      fields.birth_date = lightFormat(values?.birth_date.$d, "yyyy-MM-dd");
    }

    mutate(fields);
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

  useEffect(() => {
    if (error !== null) {
      void messageApi.error({
        key: "inspector-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: error?.statusText ?? t("error-fetching-data"),
      });
    }

    if (locationsError !== null) {
      void messageApi.error({
        key: "regions-error",
        // @ts-expect-error error type is unknown but it will get Response type and object from axios
        content: locationsError?.statusText ?? t("error-fetching-data"),
      });
    }
  }, [error, locationsError, messageApi, t]);

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
    regions,
    districts,
    contextHolder,
    goBack,
    handleCancel,
    submitHandler,
    handleRegionChange,
    t,
  };
}
