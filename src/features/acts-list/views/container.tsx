import { Outlet, useMatch } from "react-router-dom";

interface Props {
  of: React.ReactElement;
}

export default function Container(props: Props): React.ReactElement {
  const { of } = props;

  const match = useMatch("/list-of-acts/:actId");

  if (match !== null) {
    return <Outlet />;
  }

  return of;
}
