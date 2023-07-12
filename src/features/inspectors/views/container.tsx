import useMatchEither from "@/hooks/useMatchEither";
import Inspector from "./inspector";
import Inspectors from "./inspectors";

export default function Container(): React.ReactElement {
  const match = useMatchEither([
    "/inspectors/create-inspector",
    "/inspectors/:inspectorId",
  ]);

  if (match !== null) {
    return <Inspector />;
  }

  return <Inspectors />;
}
