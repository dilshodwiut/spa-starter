type DataType = "ext" | "filename";

export default function getFileData(dataType: DataType, fileUrl = ""): string {
  let separator = "/";

  if (dataType === "ext") {
    separator = ".";
  }

  const pieces = fileUrl.split(separator);

  const lastItem = pieces.at(-1);

  if (lastItem !== undefined) {
    return pieces.length > 1 ? lastItem : "";
  }

  return "";
}
