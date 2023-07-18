import { t } from "@/utils/i18n";

export default function showTotal(
  total: number,
  range: [number, number],
): React.ReactElement {
  return (
    <span className="text-[#8498B4]">
      {t("acts-shown")} {range[0]}-{range[1]} {t("out-of")} {total}
    </span>
  );
}
