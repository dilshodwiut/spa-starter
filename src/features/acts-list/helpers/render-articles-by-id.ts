import {
  always,
  compose,
  concat,
  equals,
  find,
  head,
  ifElse,
  join,
  propEq,
  reduce,
} from "ramda";
import type { Option } from "../types";

interface Article {
  law_article_id: number;
}

type FindArticle = (options: Option[]) => Record<string, string> | undefined;

const joinComma = join(", ");

const renderArticlesById = (options: Option[], idsList: Article[]): string => {
  const concatVal = (acc: string[], curr: Article): string[] => {
    const findArticle: FindArticle = find(propEq(curr.law_article_id, "value"));

    const article = findArticle(options);

    const notFound = compose(equals(undefined), head);
    const getVal = ifElse(notFound, always(acc), concat(acc));

    return getVal([article?.label as string]);
  };

  const getArticles = compose(joinComma, reduce(concatVal, []));

  return getArticles(idsList);
};

export default renderArticlesById;
