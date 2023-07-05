import { Fragment } from "react";
import { Layout, theme } from "antd";

const { Header, Content } = Layout;

export default function ActsList(): React.ReactElement {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header style={{ background: colorBgContainer }}>Header</Header>
      <Content
        className="p-6"
        style={{
          overflow: "initial",
          background: colorBgContainer,
        }}
      >
        <p>long content</p>
        {
          // indicates very long content
          Array.from({ length: 100 }, (_, index) => (
            <Fragment key={index}>
              {index % 20 === 0 && index !== 0 ? "more" : "..."}
              <br />
            </Fragment>
          ))
        }
      </Content>
    </>
  );
}
