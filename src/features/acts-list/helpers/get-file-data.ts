import { always, compose, equals, ifElse, last, split } from "ramda";

type DataType = "ext" | "filename";
type TakePortion = (list: readonly string[]) => string;

const getSeparator = ifElse(equals("ext"), always("."), always("/"));
const isEmpty = compose(equals(undefined), last);
const takePortion = ifElse(isEmpty, always(""), last) as TakePortion;

const getFileData = (dataType: DataType, fileUrl = ""): string => {
  // const toPieces = compose(split, getSeparator);
  const toPieces = split(getSeparator(dataType));

  const getData = compose(takePortion, toPieces);

  return getData(fileUrl);
};

export default getFileData;
