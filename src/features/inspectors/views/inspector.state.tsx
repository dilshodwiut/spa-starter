import { Layout, Form, Input, theme } from "antd";
import type { InspectorState } from "../types";

const { Header, Content } = Layout;

export default function useInspectorState(): InspectorState {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return { Header, Content, Form, Input, colorBgContainer };
}
