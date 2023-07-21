import { useTranslation } from "react-i18next";

interface Props {
  total: number;
  range: [number, number];
}

export default function ShowTotal(props: Props): React.ReactElement {
  const { range, total } = props;

  const { t } = useTranslation();

  return (
    <span className="text-[#8498B4]">
      {t("acts-shown")} {range[0]}-{range[1]} {t("out-of")} {total}
    </span>
  );
}
