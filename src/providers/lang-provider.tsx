import "@/utils/i18n";
import "@/lib/to-capital-case";

interface Props {
  children: React.ReactElement;
}

export default function LangProvider(props: Props): React.ReactElement {
  const { children } = props;

  return children;
}
