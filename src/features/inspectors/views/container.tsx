import { Outlet } from "react-router-dom";
import useMatchEither from "@/hooks/useMatchEither";

interface Props {
  of: React.ReactElement;
}

export default function Container(props: Props): React.ReactElement {
  const { of } = props;

  const match = useMatchEither([
    "/inspectors/create-inspector",
    "/inspectors/:inspectorId",
  ]);

  if (match) {
    return <Outlet />;
  }

  return of;
}
